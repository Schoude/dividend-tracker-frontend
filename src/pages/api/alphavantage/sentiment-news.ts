import type { APIRoute } from 'astro'
import { ALPHA_VANTAGE_FUNCTIONS, NewsSentimentFeedSchema } from '../../../utils/api/alphavantage'
import { type ValiError, parse } from 'valibot'

export const GET: APIRoute = async () => {
  const topics = 'earnings,finance,manufacturing,technology';
  const topicsQuery = `&topics=${topics}`;
  const sorting = 'LATEST';
  const limit = '30'
  const res = await fetch(`${import.meta.env.ALPHA_VANTAGE_API_URL}${ALPHA_VANTAGE_FUNCTIONS.NEWS_SENTIMENT}&sort=${sorting}&limit=${limit}${topicsQuery}&apikey=${import.meta.env.ALPHA_VANTAGE_API_TOKEN}`)

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
