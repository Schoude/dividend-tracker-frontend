import type { APIRoute } from 'astro'
import { ALPHA_VANTAGE_FUNCTIONS } from '../../../utils/api/alphavantage'

export const GET: APIRoute = async () => {
  const res = await fetch(`${import.meta.env.ALPHA_VANTAGE_API_URL}${ALPHA_VANTAGE_FUNCTIONS.NEWS_SENTIMENT}&sort=RELEVANCE&limit=20&apikey=${import.meta.env.ALPHA_VANTAGE_API_TOKEN}`)

  if (!res.ok) {
    return new Response(null, {
      status: 500,
      statusText: 'Server Error'
    });
  }

  // TODO: add valibot validation & types for the request

  const json = await res.json();

  if ("Note" in json || "Information" in json) {
    return new Response(null, {
      status: 500,
      statusText: `API Quote Reached: ${json['Note']}`
    });
  }

  const articlesBullish = json.feed
    .filter(article => article.overall_sentiment_score >= .15)
    .sort((a, b) => b.overall_sentiment_score - a.overall_sentiment_score);

  const articlesBearish = json.feed
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
}
