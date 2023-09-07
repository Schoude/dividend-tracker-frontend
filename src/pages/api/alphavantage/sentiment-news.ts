import type { APIRoute } from 'astro'
import { ALPHA_VANTAGE_FUNCTIONS, NewsSentimentFeedSchema, type ArticleNewsSentiment } from '../../../utils/api/alphavantage'
import { ValiError, parse } from 'valibot'

export const GET: APIRoute = async () => {
  // const topics = `&topics=${topics}` + 'earnings,mergers_and_acquisitions,financial_markets,economy_fiscal,economy_monetary,economy_macro,energy_transportation,finance,life_sciences,manufacturing,real_estate,retail_wholesale,technology';
  const sorting = 'RELEVANCE';
  const limit = '20'
  const res = await fetch(`${import.meta.env.ALPHA_VANTAGE_API_URL}${ALPHA_VANTAGE_FUNCTIONS.NEWS_SENTIMENT}&sort=${sorting}&limit=${limit}&apikey=${import.meta.env.ALPHA_VANTAGE_API_TOKEN}`)

  if (!res.ok) {
    return new Response(null, {
      status: 500,
      statusText: 'Server Error'
    });
  }

  const json = await res.json();

  if ("Note" in json || "Information" in json) {
    return new Response(null, {
      status: 500,
      statusText: `API Quote Reached: ${json['Note']}`
    });
  }

  try {
    const parsed = parse(NewsSentimentFeedSchema, json.feed);

    const articlesBullish = parsed
      .filter(article => article.overall_sentiment_score >= .15)
      .sort((a, b) => b.overall_sentiment_score - a.overall_sentiment_score);

    const articlesBearish = parsed
      .filter(article => article.overall_sentiment_score <= -.15)
      .sort((a, b) => a.overall_sentiment_score - b.overall_sentiment_score);

    return new Response(JSON.stringify({
      articlesBullish,
      articlesBearish,
    }), {
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    console.log((error as ValiError).name);
    console.log((error as ValiError).message);

    return new Response(null, {
      status: 500,
      statusText: 'Server Error'
    });
  }
}
