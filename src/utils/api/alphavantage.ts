import { object, type Output, string, number, array, enumType, union, nullType } from 'valibot';

// START Sentiment News
const ArticleNewsSentimentSchema = object({
  title: string(),
  url: string(),
  time_published: string(),
  summary: string(),
  banner_image: union([string(), nullType()]),
  source: string(),
  source_domain: string(),
  overall_sentiment_score: number(),
  overall_sentiment_label: enumType(["Bearish", "Bullish", "Neutral", "Somewhat-Bearish", "Somewhat-Bullish"]),
  ticker_sentiment: array(object({
    ticker: string(),
    relevance_score: string(),
    ticker_sentiment_score: string(),
    ticker_sentiment_label: enumType(["Bearish", "Bullish", "Neutral", "Somewhat-Bearish", "Somewhat-Bullish"]),
  })),
  topics: array(object({
    topic: string(),
    relevance_score: string(),
  }))
});

export const NewsSentimentFeedSchema = array(ArticleNewsSentimentSchema);

export type ArticleNewsSentiment = Output<typeof ArticleNewsSentimentSchema>;
// END Sentiment News

// START Top Gainers / Losers
const GainerOrLoser = object({
  ticker: string(),
  price: string(),
  change_amount: string(),
  change_percentage: string(),
  volume: string(),
})

export const TopGainersLosersSchema = object({
  top_gainers: array(GainerOrLoser),
  top_losers: array(GainerOrLoser),
})
// END Top Gainers / Losers

export const ALPHA_VANTAGE_FUNCTIONS = {
  NEWS_SENTIMENT: 'NEWS_SENTIMENT',
  TOP_GAINERS_LOSERS: 'TOP_GAINERS_LOSERS',
  OVERVIEW: 'OVERVIEW',
} as const;

export function getAlphavantageDate(date: string) {
  const parts = date.split('');
  parts.splice(4, 0, '-');
  parts.splice(7, 0, '-')
  parts.splice(13, 0, ':')
  parts.splice(16, 0, ':')
  parts.push('.540Z');
  return new Date(parts.join(''));
}

export function createAlphavantageDate(monthsAgo: number): string {
  const currentDate = new Date();

  // Calculate the date in the past
  currentDate.setMonth(currentDate.getMonth() - monthsAgo);

  // Extract year, month, and day
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so we add 1
  const day = currentDate.getDate().toString().padStart(2, '0');

  // Format the date as 'YYYYMMDDTHHMM'
  const formattedDate = `${year}${month}${day}T0000`;

  return formattedDate;
}
