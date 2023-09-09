import type { APIContext, APIRoute } from 'astro'
import { ALPHA_VANTAGE_FUNCTIONS, NewsSentimentFeedSchema } from '../../../../utils/api/alphavantage'
import { type ValiError, parse } from 'valibot'

export const GET: APIRoute = async (context: APIContext) => {
  const sorting = 'RELEVANCE';
  const limit = '30'
  const url = `${import.meta.env.ALPHA_VANTAGE_API_URL}${ALPHA_VANTAGE_FUNCTIONS.NEWS_SENTIMENT}&sort=${sorting}&limit=${limit}&tickers=${context.params.ticker}&apikey=${import.meta.env.ALPHA_VANTAGE_API_TOKEN}`;

  const res = await fetch(url)

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

    const articlesSorted = parsed
      .filter(article => article.overall_sentiment_score >= .15 || article.overall_sentiment_score <= .15)
      .sort((a, b) => b.overall_sentiment_score - a.overall_sentiment_score);

    return new Response(JSON.stringify(articlesSorted), {
      status: 200,
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
};
