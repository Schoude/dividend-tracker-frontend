import { object, type Output, parse, string, number, array, enumType, ValiError, union, nullType } from 'valibot';

const ArticleNewsSentimentSchema = object({
  title: string(),
  url: string(),
  time_published: string(),
  authors: array(string()),
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
