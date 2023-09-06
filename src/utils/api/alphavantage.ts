import { object, type Output, parse, string, number, array, enumType, ValiError, union, nullType } from 'valibot';

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

export const ALPHA_VANTAGE_FUNCTIONS = {
  NEWS_SENTIMENT: 'NEWS_SENTIMENT'
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
