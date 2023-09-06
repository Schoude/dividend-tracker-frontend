import type { APIRoute } from 'astro'
import { ALPHA_VANTAGE_FUNCTIONS, NewsSentimentFeedSchema } from '../../../utils/api/alphavantage'
import { ValiError, parse } from 'valibot'

const demoFeed = [
  {

    "title": "SHAREHOLDER ALERT: Pomerantz Law Firm Investigates Claims on Behalf of Investors of Outlook Therapeutics, Inc. - OTLK",
    "url": "https://www.benzinga.com/pressreleases/23/09/g34291191/shareholder-alert-pomerantz-law-firm-investigates-claims-on-behalf-of-investors-of-outlook-therape",
    "time_published": "20230906T185658",
    "authors": [
      "Globe Newswire"
    ],
    "summary": "NEW YORK, Sept. 06, 2023 ( GLOBE NEWSWIRE ) -- Pomerantz LLP is investigating claims on behalf of investors of Outlook Therapeutics, Inc. ( \"Outlook\" or the \"Company\" ) OTLK. Such investors are advised to contact Robert S. Willoughby at newaction@pomlaw.com or 888-476-6529, ext. 7980.",
    "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
    "source": "Benzinga",
    "category_within_source": "News",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Life Sciences",
        "relevance_score": "1.0"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.161647"
      }
    ],
    "overall_sentiment_score": -0.019487,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "OTLK",
        "relevance_score": "0.262522",
        "ticker_sentiment_score": "0.0",
        "ticker_sentiment_label": "Neutral"
      }
    ]
  },
  {
    "title": "SHAREHOLDER ALERT: Pomerantz Law Firm Investigates Claims On Behalf of Investors of Syneos Health, Inc. - SYNH",
    "url": "https://www.benzinga.com/pressreleases/23/09/g34291176/shareholder-alert-pomerantz-law-firm-investigates-claims-on-behalf-of-investors-of-syneos-health-i",
    "time_published": "20230906T185439",
    "authors": [
      "Globe Newswire"
    ],
    "summary": "NEW YORK, Sept. 06, 2023 ( GLOBE NEWSWIRE ) -- Pomerantz LLP is investigating claims on behalf of investors of Syneos Health, Inc. ( \"Syneos\" or the \"Company\" ) SYNH. Such investors are advised to contact Robert S. Willoughby at newaction@pomlaw.com or 888-476-6529, ext. 7980.",
    "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
    "source": "Benzinga",
    "category_within_source": "News",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Financial Markets",
        "relevance_score": "0.929393"
      }
    ],
    "overall_sentiment_score": 0.019297,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "SYNH",
        "relevance_score": "0.11123",
        "ticker_sentiment_score": "0.0",
        "ticker_sentiment_label": "Neutral"
      }
    ]
  },
  {
    "title": "Medical Device Provider Silk Road Pioneers Innovative Stroke Prevention Method: Analyst - Silk Road Medical  ( NASDAQ:SILK ) ",
    "url": "https://www.benzinga.com/analyst-ratings/analyst-color/23/09/34288764/medical-device-provider-silk-road-pioneers-innovative-stroke-prevention-method-anal",
    "time_published": "20230906T185208",
    "authors": [
      "Vandana Singh"
    ],
    "summary": "Oppenheimer has initiated coverage on Silk Road Medical Inc SILK with an Outperform rating and price target of $30.",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/09/06/silk.png?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "General",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Life Sciences",
        "relevance_score": "1.0"
      }
    ],
    "overall_sentiment_score": 0.281204,
    "overall_sentiment_label": "Somewhat-Bullish",
    "ticker_sentiment": [
      {
        "ticker": "SILK",
        "relevance_score": "0.644033",
        "ticker_sentiment_score": "0.395895",
        "ticker_sentiment_label": "Bullish"
      }
    ]
  },
  {
    "title": "The Weather Is About to Get Even Weirder",
    "url": "https://www.theatlantic.com/science/archive/2023/09/fall-winter-heat-el-nino-climate-change/675238/",
    "time_published": "20230906T185100",
    "authors": [
      "Lois Parshley"
    ],
    "summary": "The Extreme Weather Isn't Ending With Summer The Atlantic ...",
    "banner_image": "https://cdn.theatlantic.com/thumbor/tYKH90Sz4i31sEqI0Wzt_h8idNI=/0x0:8256x4644/960x540/media/img/mt/2023/09/GettyImages_1549173068/original.jpg",
    "source": "The Atlantic",
    "category_within_source": "n/a",
    "source_domain": "www.theatlantic.com",
    "topics": [
      {
        "topic": "Retail & Wholesale",
        "relevance_score": "1.0"
      }
    ],
    "overall_sentiment_score": -0.069472,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "SBUX",
        "relevance_score": "0.023304",
        "ticker_sentiment_score": "-0.076041",
        "ticker_sentiment_label": "Neutral"
      }
    ]
  },
  {
    "title": "Want To Bet Against 'Woke' Companies? There's An ETF For That",
    "url": "https://www.benzinga.com/markets/esg/23/09/34288808/want-to-bet-against-woke-companies-theres-an-etf-for-that",
    "time_published": "20230906T185002",
    "authors": [
      "AJ Fabino"
    ],
    "summary": "While Florida Gov. Ron DeSantis and his fellow Republicans are leading the political charge against \"woke\" companies, Tuttle Capital Management's CEO Matthew Tuttle is leading the monetary charge. And, you may be able to invest in this come Nov. 20.",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/09/06/woke.shutterstock_1392600140.jpg?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "General",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Economy - Monetary",
        "relevance_score": "0.158519"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.99246"
      }
    ],
    "overall_sentiment_score": 0.078312,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [

    ]
  },
  {
    "title": "Denali Therapeutics Breakthrough Blood-Brain Barrier Platform A Game-Changer in Neurodegenerative Diseases: Analyst - Denali Therapeutics  ( NASDAQ:DNLI ) ",
    "url": "https://www.benzinga.com/analyst-ratings/analyst-color/23/09/34287817/denali-therapeutics-breakthrough-blood-brain-barrier-platform-a-game-changer-in-neu",
    "time_published": "20230906T184528",
    "authors": [
      "Vandana Singh"
    ],
    "summary": "B Riley Securities initiated coverage on Denali Therapeutics Inc DNLI with a Buy rating and a price target of $38.",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/09/06/dnli.png?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "General",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Life Sciences",
        "relevance_score": "1.0"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.360215"
      }
    ],
    "overall_sentiment_score": 0.210215,
    "overall_sentiment_label": "Somewhat-Bullish",
    "ticker_sentiment": [
      {
        "ticker": "BIIB",
        "relevance_score": "0.29234",
        "ticker_sentiment_score": "-0.189865",
        "ticker_sentiment_label": "Somewhat-Bearish"
      },
      {
        "ticker": "DNLI",
        "relevance_score": "0.426225",
        "ticker_sentiment_score": "0.133125",
        "ticker_sentiment_label": "Neutral"
      }
    ]
  },
  {
    "title": "Peering Into Costco Wholesale's Recent Short Interest - Costco Wholesale  ( NASDAQ:COST ) ",
    "url": "https://www.benzinga.com/short-sellers/23/09/34290603/peering-into-costco-wholesales-recent-short-interest",
    "time_published": "20230906T184524",
    "authors": [
      "Benzinga Insights"
    ],
    "summary": "Costco Wholesale's COST short percent of float has fallen 3.19% since its last report. The company recently reported that it has 4.04 million shares sold short, which is 0.91% of all regular shares that are available for trading.",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/movers_image_18.jpeg?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "Trading",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Retail & Wholesale",
        "relevance_score": "1.0"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.365926"
      }
    ],
    "overall_sentiment_score": 0.239316,
    "overall_sentiment_label": "Somewhat-Bullish",
    "ticker_sentiment": [
      {
        "ticker": "COST",
        "relevance_score": "0.426824",
        "ticker_sentiment_score": "0.247129",
        "ticker_sentiment_label": "Somewhat-Bullish"
      }
    ]
  },
  {
    "title": " ( AJG )  - Analyzing Arthur J. Gallagher's Short Interest - Arthur J. Gallagher  ( NYSE:AJG ) ",
    "url": "https://www.benzinga.com/short-sellers/23/09/34290602/ajg-analyzing-arthur-j-gallaghers-short-interest",
    "time_published": "20230906T184520",
    "authors": [
      "Benzinga Insights"
    ],
    "summary": "Arthur J. Gallagher's AJG short percent of float has risen 11.84% since its last report. The company recently reported that it has 1.59 million shares sold short, which is 0.85% of all regular shares that are available for trading.",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/movers_image_0.jpeg?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "Trading",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Financial Markets",
        "relevance_score": "0.365926"
      }
    ],
    "overall_sentiment_score": 0.265071,
    "overall_sentiment_label": "Somewhat-Bullish",
    "ticker_sentiment": [

    ]
  },
  {
    "title": "Peering Into ING Groep's Recent Short Interest - ING Groep  ( NYSE:ING ) ",
    "url": "https://www.benzinga.com/short-sellers/23/09/34290599/peering-into-ing-groeps-recent-short-interest",
    "time_published": "20230906T184515",
    "authors": [
      "Benzinga Insights"
    ],
    "summary": "ING Groep's ING short percent of float has fallen 14.29% since its last report. The company recently reported that it has 4.23 million shares sold short, which is 0.12% of all regular shares that are available for trading. Based on its trading volume, it would take traders 1.66 days to cover ...",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/movers_image_0.jpeg?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "Trading",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Financial Markets",
        "relevance_score": "0.365926"
      }
    ],
    "overall_sentiment_score": 0.237023,
    "overall_sentiment_label": "Somewhat-Bullish",
    "ticker_sentiment": [

    ]
  },
  {
    "title": "Fed Beige Book Reveals Slower Consumer Spending, Higher Delinquencies - SPDR Select Sector Fund - Consumer Discretionary  ( ARCA:XLY ) , Real Estate Select Sector SPDR Fund  ( The )   ( ARCA:XLRE ) ",
    "url": "https://www.benzinga.com/markets/equities/23/09/34290595/fed-beige-book-reveals-slower-consumer-spending-higher-delinquencies",
    "time_published": "20230906T184451",
    "authors": [
      "Piero Cingari"
    ],
    "summary": "The most recent Federal Reserve Beige Book offers a nuanced view of the economy, revealing a moderate growth pace during July and August. Under this surface, there are signs of a slowdown in discretionary consumer spending that warrant investor attention.",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/Federal_Reserve_insignia.jpeg?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "Markets",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Economy - Monetary",
        "relevance_score": "0.576289"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.161647"
      }
    ],
    "overall_sentiment_score": 0.040689,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [

    ]
  },
  {
    "title": "Wall Street Journal/College Pulse Ranks NJIT No. 2 Public University in the US",
    "url": "https://www.benzinga.com/pressreleases/23/09/g34290590/wall-street-journalcollege-pulse-ranks-njit-no-2-public-university-in-the-us",
    "time_published": "20230906T184404",
    "authors": [
      "Globe Newswire"
    ],
    "summary": "Newark, N.J., Sept. 06, 2023 ( GLOBE NEWSWIRE ) -- New Jersey Institute of Technology is the second-highest ranked public university in the Wall Street Journal/College Pulse 2024 list of the Best Colleges in the U.S.",
    "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
    "source": "Benzinga",
    "category_within_source": "News",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Earnings",
        "relevance_score": "0.310843"
      },
      {
        "topic": "Manufacturing",
        "relevance_score": "1.0"
      }
    ],
    "overall_sentiment_score": 0.330797,
    "overall_sentiment_label": "Somewhat-Bullish",
    "ticker_sentiment": [
      {
        "ticker": "NYT",
        "relevance_score": "0.095899",
        "ticker_sentiment_score": "0.206952",
        "ticker_sentiment_label": "Somewhat-Bullish"
      }
    ]
  },
  {
    "title": "G20 great platform for banking, Fintech to showcase India's growth: SCB",
    "url": "https://www.business-standard.com/companies/news/g20-great-platform-for-banking-fintech-to-showcase-india-s-growth-scb-123090601330_1.html",
    "time_published": "20230906T184350",
    "authors": [
      "ANI"
    ],
    "summary": "G20 is a great platform for banking and Fintech to showcase what India has actually strived on and achieved from a growth standpoint, said Transaction Sales Chief at Standard Chartered Bank said on Wednesday. \"We have 100-plus countries participating.",
    "banner_image": "https://bsmedia.business-standard.com/_media/bs/img/article/2023-09/06/full/1693972835-6868.jpg?im=FeatureCrop,size=(826,465)",
    "source": "Business Standard",
    "category_within_source": "GoogleRSS",
    "source_domain": "www.business-standard.com",
    "topics": [

    ],
    "overall_sentiment_score": 0.303202,
    "overall_sentiment_label": "Somewhat-Bullish",
    "ticker_sentiment": [
      {
        "ticker": "SCBFF",
        "relevance_score": "0.2256",
        "ticker_sentiment_score": "0.126537",
        "ticker_sentiment_label": "Neutral"
      }
    ]
  },
  {
    "title": "Heat pumps show how hard decarbonisation will be",
    "url": "https://www.economist.com/science-and-technology/2023/09/06/heat-pumps-show-how-hard-decarbonisation-will-be",
    "time_published": "20230906T184314",
    "authors": [
      "The Economist"
    ],
    "summary": "T off the walls of utility rooms, nestle inside kitchen cupboards and hunker down in cellars. Gas and oil boilers and furnaces have been making homes more comfortable for decades. Their adoption during the 20th century heralded the dawn of central heating and on-demand hot water and put an end to ...",
    "banner_image": "https://www.economist.com/cdn-cgi/image/width=1424,quality=80,format=auto/content-assets/images/20230909_STD002.jpg",
    "source": "The Economist",
    "category_within_source": "BusinessGoogleRSS",
    "source_domain": "www.economist.com",
    "topics": [
      {
        "topic": "Financial Markets",
        "relevance_score": "0.161647"
      }
    ],
    "overall_sentiment_score": -0.021888,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [

    ]
  },
  {
    "title": "ROSEN, RECOGNIZED INVESTOR COUNSEL, Encourages Bausch Health Companies Inc. Investors to Secure Counsel Before Important Deadline in Securities Class Action - BHC - Bausch Health Companies  ( NYSE:BHC ) ",
    "url": "https://www.benzinga.com/pressreleases/23/09/g34290586/rosen-recognized-investor-counsel-encourages-bausch-health-companies-inc-investors-to-secure-couns",
    "time_published": "20230906T184310",
    "authors": [
      "Globe Newswire"
    ],
    "summary": "NEW YORK, Sept. 06, 2023 ( GLOBE NEWSWIRE ) -- WHY: Rosen Law Firm, a global investor rights law firm, reminds purchasers of securities of Bausch Health Companies Inc. BHC between August 6, 2020 and May 3, 2023, both dates inclusive ( the \"Class Period\" ) , of the important September 25, 2023 ...",
    "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
    "source": "Benzinga",
    "category_within_source": "News",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Life Sciences",
        "relevance_score": "0.5"
      },
      {
        "topic": "Technology",
        "relevance_score": "0.5"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.495866"
      }
    ],
    "overall_sentiment_score": 0.11005,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "BHC",
        "relevance_score": "0.122269",
        "ticker_sentiment_score": "0.122201",
        "ticker_sentiment_label": "Neutral"
      },
      {
        "ticker": "BLCO",
        "relevance_score": "0.061315",
        "ticker_sentiment_score": "-0.1145",
        "ticker_sentiment_label": "Neutral"
      },
      {
        "ticker": "META",
        "relevance_score": "0.061315",
        "ticker_sentiment_score": "0.0",
        "ticker_sentiment_label": "Neutral"
      }
    ]
  },
  {
    "title": "Crude Oil Rises Over 1%; Cidara Therapeutics Shares Spike Higher - Akoustis Technologies  ( NASDAQ:AKTS ) , AMC Enter Hldgs  ( NYSE:AMC ) ",
    "url": "https://www.benzinga.com/news/earnings/23/09/34290541/crude-oil-rises-over-1-cidara-therapeutics-shares-spike-higher",
    "time_published": "20230906T184103",
    "authors": [
      "Lisa Levin"
    ],
    "summary": "U.S. stocks traded lower toward the end of trading, with the Nasdaq Composite falling more than 1% on Wednesday. The Dow traded down 0.57% to 34,443.02 while the NASDAQ fell 1.19% to 13,853.60. The S&P 500, also fell, dropping, 0.80% to 4,460.96. Utilities shares jumped by 0.2% on Wednesday.",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/09/06/crude_oil_-_logo.jpg?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "Trading",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Life Sciences",
        "relevance_score": "0.333333"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.87644"
      },
      {
        "topic": "Manufacturing",
        "relevance_score": "0.333333"
      },
      {
        "topic": "Earnings",
        "relevance_score": "0.744043"
      },
      {
        "topic": "Technology",
        "relevance_score": "0.333333"
      }
    ],
    "overall_sentiment_score": -0.033768,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "APE",
        "relevance_score": "0.057352",
        "ticker_sentiment_score": "0.127144",
        "ticker_sentiment_label": "Neutral"
      },
      {
        "ticker": "AKTS",
        "relevance_score": "0.170878",
        "ticker_sentiment_score": "0.12163",
        "ticker_sentiment_label": "Neutral"
      },
      {
        "ticker": "SPGI",
        "relevance_score": "0.226477",
        "ticker_sentiment_score": "-0.197183",
        "ticker_sentiment_label": "Somewhat-Bearish"
      },
      {
        "ticker": "CDTX",
        "relevance_score": "0.114409",
        "ticker_sentiment_score": "0.310801",
        "ticker_sentiment_label": "Somewhat-Bullish"
      },
      {
        "ticker": "PALI",
        "relevance_score": "0.170878",
        "ticker_sentiment_score": "0.157835",
        "ticker_sentiment_label": "Somewhat-Bullish"
      },
      {
        "ticker": "HUBS",
        "relevance_score": "0.057352",
        "ticker_sentiment_score": "0.263014",
        "ticker_sentiment_label": "Somewhat-Bullish"
      },
      {
        "ticker": "EZGO",
        "relevance_score": "0.114409",
        "ticker_sentiment_score": "0.127871",
        "ticker_sentiment_label": "Neutral"
      },
      {
        "ticker": "MRIN",
        "relevance_score": "0.114409",
        "ticker_sentiment_score": "0.293986",
        "ticker_sentiment_label": "Somewhat-Bullish"
      }
    ]
  },
  {
    "title": "Quanex's Strategic Moves Pay Off: Analyst Raises Price Target Amid Operational Gains - Quanex Building Prods  ( NYSE:NX ) ",
    "url": "https://www.benzinga.com/analyst-ratings/analyst-color/23/09/34288755/quanexs-strategic-moves-pay-off-analyst-raises-price-target-amid-operational-gains",
    "time_published": "20230906T184102",
    "authors": [
      "Nabaparna Bhattacharya"
    ],
    "summary": "Benchmark analyst Reuben Garner reiterated a Buy rating on Quanex Building Products Corporation NX, raising the price target to $33. The company recently reported Q3 results, where earnings and revenues beat estimates.",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/09/06/nx.png?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "General",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Economy - Monetary",
        "relevance_score": "0.158519"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.108179"
      },
      {
        "topic": "Manufacturing",
        "relevance_score": "1.0"
      },
      {
        "topic": "Earnings",
        "relevance_score": "0.495866"
      },
      {
        "topic": "Mergers & Acquisitions",
        "relevance_score": "0.158519"
      }
    ],
    "overall_sentiment_score": 0.038653,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "NX",
        "relevance_score": "0.357293",
        "ticker_sentiment_score": "0.0",
        "ticker_sentiment_label": "Neutral"
      }
    ]
  },
  {
    "title": "Sleep Device Player ResMed's Potential Obstacles: Analyst Weighs Obesity Drugs & Philips' Re-Entry - ResMed  ( NYSE:RMD ) ",
    "url": "https://www.benzinga.com/analyst-ratings/analyst-color/23/09/34286819/sleep-device-player-resmeds-potential-obstacles-analyst-weighs-obesity-drugs-philip",
    "time_published": "20230906T183934",
    "authors": [
      "Vandana Singh"
    ],
    "summary": "Needham upgraded ResMed Inc RMD from a Hold to Buy rating with a price target of $180. The analysts Mike Matson, Joseph Conway, and David Saxon note that ResMed's shares are down 31% since the start of August ( versus a 2% decline in the S&P 500 ) , mainly due to concerns about the potential for ...",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/09/06/rmd.png?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "General",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Earnings",
        "relevance_score": "0.839681"
      },
      {
        "topic": "Life Sciences",
        "relevance_score": "1.0"
      }
    ],
    "overall_sentiment_score": -0.002435,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "RMD",
        "relevance_score": "0.62523",
        "ticker_sentiment_score": "0.472418",
        "ticker_sentiment_label": "Bullish"
      }
    ]
  },
  {
    "title": "WeWork says it will renegotiate nearly all its leases, leave 'unfit and underperforming' locations",
    "url": "https://www.foxbusiness.com/lifestyle/wework-renegotiate-nearly-all-its-leases-leave-unfit-underperforming-locations",
    "time_published": "20230906T183744",
    "authors": [
      "Daniella Genovese"
    ],
    "summary": "WeWork is renegotiating nearly all of its leases and leaving underperforming locations but is \"here to stay,\" the company's chief executive said Wednesday.",
    "banner_image": "https://static.foxbusiness.com/foxbusiness.com/content/uploads/2023/09/WeWork.jpg",
    "source": "Fox Business News",
    "category_within_source": "n/a",
    "source_domain": "www.foxbusiness.com",
    "topics": [
      {
        "topic": "Earnings",
        "relevance_score": "0.682689"
      },
      {
        "topic": "Real Estate & Construction",
        "relevance_score": "1.0"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.158519"
      }
    ],
    "overall_sentiment_score": 0.023903,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "WE",
        "relevance_score": "0.617765",
        "ticker_sentiment_score": "0.21845",
        "ticker_sentiment_label": "Somewhat-Bullish"
      }
    ]
  },
  {
    "title": "Ice Cold: Feds Freeze Celsius Founder Alex Mashinsky's Assets",
    "url": "https://decrypt.co/155163/feds-freeze-former-celsius-ceo-alex-mashinskys-assets",
    "time_published": "20230906T183707",
    "authors": [
      "Mat Di Salvo"
    ],
    "summary": "The alleged conman is facing a number of criminal and civil charges following the collapse of Celsius last year.",
    "banner_image": "https://cdn.decrypt.co/resize/1024/height/512/wp-content/uploads/2023/09/alex-mashinsky-bitcoin-conference-2019-gID_7.jpg",
    "source": "Decrypt.co",
    "category_within_source": "n/a",
    "source_domain": "decrypt.co",
    "topics": [
      {
        "topic": "Finance",
        "relevance_score": "1.0"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.744043"
      }
    ],
    "overall_sentiment_score": -0.067047,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "GS",
        "relevance_score": "0.136888",
        "ticker_sentiment_score": "0.045279",
        "ticker_sentiment_label": "Neutral"
      }
    ]
  },
  {
    "title": "Analysis: Tax slump in outperforming Brazilian economy scrambles reform plans",
    "url": "https://www.reuters.com/markets/emerging/tax-slump-outperforming-brazilian-economy-scrambles-reform-plans-2023-09-06/",
    "time_published": "20230906T183554",
    "authors": [
      "Marcela Ayres",
      "Bernardo Caram"
    ],
    "summary": "Brazil's President Luiz Inacio Lula da Silva speaks alongside Brazil's Finance Minister Fernando Haddad during a meeting with auto industry leaders at the Planalto Palace in Brasilia, Brazil, May 25, 2023. REUTERS/Ueslei Marcelino/File Photo Acquire Licensing Rights",
    "banner_image": "https://graphics.reuters.com/BRAZIL-ECONOMY/mopajqkqova/chart_eikon.jpg",
    "source": "Reuters",
    "category_within_source": "Markets",
    "source_domain": "www.reuters.com",
    "topics": [
      {
        "topic": "Economy - Monetary",
        "relevance_score": "0.576289"
      },
      {
        "topic": "Earnings",
        "relevance_score": "0.413559"
      },
      {
        "topic": "Economy - Fiscal",
        "relevance_score": "0.310843"
      }
    ],
    "overall_sentiment_score": -0.017086,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [

    ]
  },
  {
    "title": "Thyssenkrupp CFO Keysberg to step down next year",
    "url": "https://www.reuters.com/markets/commodities/thyssenkrupp-cfo-keysberg-step-down-next-year-2023-09-06/",
    "time_published": "20230906T183540",
    "authors": [
      "Reuters"
    ],
    "summary": "CFO of German industrial and technology business group ThyssenKrupp Dr Klaus Keysberg attends the annual results news conference in Essen, Germany, November 17, 2022. REUTERS/Thilo Schmuelgen/File Photo Acquire Licensing Rights",
    "banner_image": "https://cloudfront-us-east-2.images.arcpublishing.com/reuters/POR2FGU5TNPYRLGOLJ2FV3G3AQ.jpg",
    "source": "Reuters",
    "category_within_source": "Markets",
    "source_domain": "www.reuters.com",
    "topics": [

    ],
    "overall_sentiment_score": 0.048377,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "TYEKF",
        "relevance_score": "0.382925",
        "ticker_sentiment_score": "0.0",
        "ticker_sentiment_label": "Neutral"
      }
    ]
  },
  {
    "title": "ROSEN, SKILLED INVESTOR COUNSEL, Encourages NAPCO Security Technologies, Inc. Investors with Losses to Secure Counsel Before Important Deadline in Securities Class Action - NSSC - NAPCO Security Techs  ( NASDAQ:NSSC ) ",
    "url": "https://www.benzinga.com/pressreleases/23/09/g34290460/rosen-skilled-investor-counsel-encourages-napco-security-technologies-inc-investors-with-losses-to",
    "time_published": "20230906T183500",
    "authors": [
      "Globe Newswire"
    ],
    "summary": "NEW YORK, Sept. 06, 2023 ( GLOBE NEWSWIRE ) -- WHY: Rosen Law Firm, a global investor rights law firm, reminds purchasers of the securities of NAPCO Security Technologies, Inc. NSSC between November 7, 2022 and August 18, 2023, both dates inclusive ( the \"Class Period\" ) , of the important ...",
    "banner_image": "https://www.benzinga.com/next-assets/images/schema-image-default.png",
    "source": "Benzinga",
    "category_within_source": "News",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Financial Markets",
        "relevance_score": "0.714479"
      },
      {
        "topic": "Manufacturing",
        "relevance_score": "0.5"
      },
      {
        "topic": "Earnings",
        "relevance_score": "0.158519"
      },
      {
        "topic": "Technology",
        "relevance_score": "0.5"
      }
    ],
    "overall_sentiment_score": 0.115278,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "META",
        "relevance_score": "0.051886",
        "ticker_sentiment_score": "0.0",
        "ticker_sentiment_label": "Neutral"
      },
      {
        "ticker": "NSSC",
        "relevance_score": "0.103554",
        "ticker_sentiment_score": "0.112767",
        "ticker_sentiment_label": "Neutral"
      }
    ]
  },
  {
    "title": "'Please Answer The Phone': Lost Colorado Hiker Ignores Crucial Rescue Calls",
    "url": "https://www.benzinga.com/news/23/09/34281891/please-answer-the-phone-lost-colorado-hiker-ignores-crucial-rescue-calls",
    "time_published": "20230906T183316",
    "authors": [
      "Bibhu Pattnaik"
    ],
    "summary": "In an unusual twist, a man hiking in Colorado found himself disoriented on a mountain trail, and inadvertently bypassed calls from his would-be rescuers. The reason? The incoming call's number was unfamiliar. The search parties attempting to make contact faced repeated call rejections from the ...",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/09/06/hiker_shutter.jpg?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "News",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Technology",
        "relevance_score": "1.0"
      }
    ],
    "overall_sentiment_score": -0.022251,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "META",
        "relevance_score": "0.110973",
        "ticker_sentiment_score": "0.078254",
        "ticker_sentiment_label": "Neutral"
      }
    ]
  },
  {
    "title": "Check Out What Whales Are Doing With CSCO - Cisco Systems  ( NASDAQ:CSCO ) ",
    "url": "https://www.benzinga.com/markets/options/23/09/34290409/check-out-what-whales-are-doing-with-csco",
    "time_published": "20230906T183209",
    "authors": [
      "Benzinga Insights"
    ],
    "summary": "Someone with a lot of money to spend has taken a bullish stance on Cisco Systems CSCO. We noticed this today when the big position showed up on publicly available options history that we track here at Benzinga. Whether this is an institution or just a wealthy individual, we don't know.",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/movers_image_1.jpeg?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "Markets",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Earnings",
        "relevance_score": "0.158519"
      },
      {
        "topic": "Technology",
        "relevance_score": "1.0"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.266143"
      }
    ],
    "overall_sentiment_score": 0.200261,
    "overall_sentiment_label": "Somewhat-Bullish",
    "ticker_sentiment": [
      {
        "ticker": "CSCO",
        "relevance_score": "0.878286",
        "ticker_sentiment_score": "0.425012",
        "ticker_sentiment_label": "Bullish"
      }
    ]
  },
  {
    "title": "Starbucks Unusual Options Activity - Starbucks  ( NASDAQ:SBUX ) ",
    "url": "https://www.benzinga.com/markets/options/23/09/34290408/starbucks-unusual-options-activity",
    "time_published": "20230906T183205",
    "authors": [
      "Benzinga Insights"
    ],
    "summary": "A whale with a lot of money to spend has taken a noticeably bearish stance on Starbucks. Looking at options history for Starbucks SBUX we detected 11 strange trades. If we consider the specifics of each trade, it is accurate to state that 45% of the investors opened trades with bullish ...",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/movers_image_1.jpeg?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "Markets",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Earnings",
        "relevance_score": "0.158519"
      },
      {
        "topic": "Retail & Wholesale",
        "relevance_score": "1.0"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.214378"
      }
    ],
    "overall_sentiment_score": 0.10655,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "SBUX",
        "relevance_score": "0.818966",
        "ticker_sentiment_score": "0.230709",
        "ticker_sentiment_label": "Somewhat-Bullish"
      }
    ]
  },
  {
    "title": "Looking At Abbott Laboratories's Recent Unusual Options Activity - Abbott Laboratories  ( NYSE:ABT ) ",
    "url": "https://www.benzinga.com/markets/options/23/09/34290407/looking-at-abbott-laboratoriess-recent-unusual-options-activity",
    "time_published": "20230906T183200",
    "authors": [
      "Benzinga Insights"
    ],
    "summary": "Someone with a lot of money to spend has taken a bearish stance on Abbott Laboratories ABT. We noticed this today when the big position showed up on publicly available options history that we track here at Benzinga. Whether this is an institution or just a wealthy individual, we don't know.",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/movers_image_5.jpeg?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "Markets",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Earnings",
        "relevance_score": "0.158519"
      },
      {
        "topic": "Life Sciences",
        "relevance_score": "1.0"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.266143"
      }
    ],
    "overall_sentiment_score": 0.144016,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "ABT",
        "relevance_score": "0.720958",
        "ticker_sentiment_score": "0.166616",
        "ticker_sentiment_label": "Somewhat-Bullish"
      }
    ]
  },
  {
    "title": "Cannabis Stock News: NEVIS BRANDS INC.  ( CSE: NEVI )  Announces Expansion of Major™ brands to Nevada",
    "url": "https://www.investorideas.com/news/2023/cannabis/09062CSE-NEVI.asp",
    "time_published": "20230906T183115",
    "authors": [

    ],
    "summary": "Cannabis Stock News: NEVIS BRANDS INC. ( CSE: NEVI ... ...",
    "banner_image": null,
    "source": "Investor Ideas",
    "category_within_source": "n/a",
    "source_domain": "www.investorideas.com",
    "topics": [
      {
        "topic": "Financial Markets",
        "relevance_score": "0.495866"
      }
    ],
    "overall_sentiment_score": 0.199311,
    "overall_sentiment_label": "Somewhat-Bullish",
    "ticker_sentiment": [

    ]
  },
  {
    "title": "CA mayor warns crime, Democrat-led 'moral crisis' are 'coming home to the suburbs'",
    "url": "https://www.foxbusiness.com/politics/ca-mayor-warns-crime-democrat-led-moral-crisis-coming-home-suburbs",
    "time_published": "20230906T183023",
    "authors": [
      "Kristen Altus"
    ],
    "summary": "A Republican California mayor is blaming Democratic policies for bringing theft and crime to neighborhoods and taking away many of his residents' primary grocery store. \"We have 103,000 people here in Vista and now a third of our residents don't have a grocery store in their neighborhood.",
    "banner_image": "https://cf-images.us-east-1.prod.boltdns.net/v1/static/854081161001/7c1189bd-277d-4889-ac11-154830ad2652/99985709-61f7-4e5a-ac4d-c0295563f27a/1280x720/match/image.jpg",
    "source": "Fox Business News",
    "category_within_source": "n/a",
    "source_domain": "www.foxbusiness.com",
    "topics": [
      {
        "topic": "Retail & Wholesale",
        "relevance_score": "1.0"
      }
    ],
    "overall_sentiment_score": -0.178138,
    "overall_sentiment_label": "Somewhat-Bearish",
    "ticker_sentiment": [
      {
        "ticker": "WMT",
        "relevance_score": "0.08687",
        "ticker_sentiment_score": "-0.359117",
        "ticker_sentiment_label": "Bearish"
      }
    ]
  },
  {
    "title": "Stuart Varney: Why are so many Americans pessimistic about our country's future?",
    "url": "https://www.foxbusiness.com/politics/stuart-varney-why-many-americans-pessimistic-about-countrys-future",
    "time_published": "20230906T183003",
    "authors": [
      "FOXBusiness"
    ],
    "summary": "During his \"My Take,\" Wednesday, \"Varney & Co.\" host Stuart Varney discussed why the vast majority of Americans feel unsettled about our nation's future, arguing that, despite some good headlines and economic data, things underneath are not all that good - and everyday people see it.",
    "banner_image": "https://cf-images.us-east-1.prod.boltdns.net/v1/static/854081161001/e55e107d-b8e2-4e0c-84a8-cbfd5922d819/7b3e322b-9318-459b-9f56-bc1b0d64f5d5/1280x720/match/image.jpg",
    "source": "Fox Business News",
    "category_within_source": "n/a",
    "source_domain": "www.foxbusiness.com",
    "topics": [
      {
        "topic": "Economy - Monetary",
        "relevance_score": "0.451494"
      },
      {
        "topic": "Manufacturing",
        "relevance_score": "1.0"
      }
    ],
    "overall_sentiment_score": -0.154008,
    "overall_sentiment_label": "Somewhat-Bearish",
    "ticker_sentiment": [
      {
        "ticker": "NYT",
        "relevance_score": "0.115232",
        "ticker_sentiment_score": "0.0",
        "ticker_sentiment_label": "Neutral"
      }
    ]
  },
  {
    "title": "Doug Kass: Investors, Like Ostriches, May Have Their Heads in the Sand",
    "url": "https://realmoney.thestreet.com/markets/doug-kass-investors-like-ostriches-may-have-their-heads-in-the-sand-16132655",
    "time_published": "20230906T183000",
    "authors": [
      "Doug Kass"
    ],
    "summary": "\"The imaginary person out there -- Mr. Market -- he's kind of a drunken psycho. Some days he gets very enthused, some days he gets very depressed. And when he gets really enthused, you sell to him and if he gets depressed you buy from him. There's no moral taint attached to that.\"",
    "banner_image": "https://s.thestreet.com/files/tsc/v2008/photos/contrib/uploads/4ab697eb-8d00-11ed-877a-6f43c0fa482d_564x376.jpg",
    "source": "The Street",
    "category_within_source": "GoogleRSS",
    "source_domain": "realmoney.thestreet.com",
    "topics": [
      {
        "topic": "Economy - Monetary",
        "relevance_score": "0.999973"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "1.0"
      },
      {
        "topic": "Earnings",
        "relevance_score": "0.451494"
      },
      {
        "topic": "Energy & Transportation",
        "relevance_score": "1.0"
      }
    ],
    "overall_sentiment_score": 0.022186,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "AAL",
        "relevance_score": "0.016975",
        "ticker_sentiment_score": "0.061434",
        "ticker_sentiment_label": "Neutral"
      }
    ]
  },
  {
    "title": "Plants don't have ears. But they can still detect sound",
    "url": "https://www.economist.com/science-and-technology/2023/09/06/plants-dont-have-ears-but-they-can-still-detect-sound",
    "time_published": "20230906T182930",
    "authors": [
      "The Economist"
    ],
    "summary": "I , he was a mere prince, King Charles, Britain's eco-minded monarch, told a television interviewer that it was important to talk to one's plants. He was widely mocked.",
    "banner_image": "https://www.economist.com/cdn-cgi/image/width=1424,quality=80,format=auto/content-assets/images/20230909_STD004.jpg",
    "source": "The Economist",
    "category_within_source": "BusinessGoogleRSS",
    "source_domain": "www.economist.com",
    "topics": [
      {
        "topic": "Earnings",
        "relevance_score": "0.158519"
      }
    ],
    "overall_sentiment_score": -0.055068,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [

    ]
  },
  {
    "title": "White House to host National HBCU Week Conference - .com",
    "url": "https://www.upi.com/Top_News/US/2023/09/06/HBCU-Week-Conference-Cardona/8181694021874/",
    "time_published": "20230906T182824",
    "authors": [
      "Clyde Hughes"
    ],
    "summary": "White House to host National HBCU Week Conference UPI News ...",
    "banner_image": "https://cdnph.upi.com/sv/ph/og/upi/8181694021874/2023/1/dd14b968b3964e63d299607c045a04d5/v1.5/White-House-to-host-National-HBCU-Week-Conference.jpg",
    "source": "UPI Business",
    "category_within_source": "n/a",
    "source_domain": "www.upi.com",
    "topics": [
      {
        "topic": "Retail & Wholesale",
        "relevance_score": "1.0"
      }
    ],
    "overall_sentiment_score": -0.029289,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "CMNR",
        "relevance_score": "0.103778",
        "ticker_sentiment_score": "0.119328",
        "ticker_sentiment_label": "Neutral"
      },
      {
        "ticker": "DSSMY",
        "relevance_score": "0.103778",
        "ticker_sentiment_score": "-0.301717",
        "ticker_sentiment_label": "Somewhat-Bearish"
      },
      {
        "ticker": "DG",
        "relevance_score": "0.103778",
        "ticker_sentiment_score": "-0.216933",
        "ticker_sentiment_label": "Somewhat-Bearish"
      }
    ]
  },
  {
    "title": "France's Casino CDS holders gear up for payout as committee declares credit event",
    "url": "https://www.reuters.com/business/retail-consumer/frances-casino-cds-holders-gear-up-payout-committee-declares-credit-event-2023-09-06/",
    "time_published": "20230906T182700",
    "authors": [
      "Chiara Elisei"
    ],
    "summary": "LONDON, Sept 6 ( Reuters ) - A committee that reviews disputes in the credit default swaps ( CDS ) market on Wednesday ruled that a failure to pay credit event occurred regarding retailer Casino Guichard-Perrachon, paving the way for a payout to investors holding the swaps.",
    "banner_image": "https://s3.amazonaws.com/arc-authors/reuters/bb63f466-74b2-452f-91b4-b451b87d2015.png",
    "source": "Reuters",
    "category_within_source": "Business",
    "source_domain": "www.reuters.com",
    "topics": [
      {
        "topic": "Economy - Fiscal",
        "relevance_score": "0.158519"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.310843"
      }
    ],
    "overall_sentiment_score": 0.105446,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "MCO",
        "relevance_score": "0.118647",
        "ticker_sentiment_score": "0.153192",
        "ticker_sentiment_label": "Somewhat-Bullish"
      },
      {
        "ticker": "CGUIF",
        "relevance_score": "0.118647",
        "ticker_sentiment_score": "-0.049865",
        "ticker_sentiment_label": "Neutral"
      }
    ]
  },
  {
    "title": "Shiba Inu Crawls Yawns As Market Falls: The Bull, Bear Case For The Dogecoin Killer",
    "url": "https://www.benzinga.com/markets/cryptocurrency/23/09/34288708/shiba-inu-crawls-yawns-as-market-falls-the-bull-bear-case-for-the-dogecoin-killer",
    "time_published": "20230906T182636",
    "authors": [
      "Melanie Schaffer"
    ],
    "summary": "Shiba Inu SHIB/USD was trading mostly flat Wednesday, showing strength in comparison to the general market, which saw the S&P 500 falling almost 1%. The crypto sector has been trading mostly horizontally since Aug. 18, with Bitcoin and Ethereum holding near $25,000 and $1,600, respectively.",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/09/06/shutterstock_1585340284.jpg?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "Trading",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Financial Markets",
        "relevance_score": "0.316726"
      }
    ],
    "overall_sentiment_score": -0.002468,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "CRYPTO:BTC",
        "relevance_score": "0.113597",
        "ticker_sentiment_score": "0.1186",
        "ticker_sentiment_label": "Neutral"
      },
      {
        "ticker": "CRYPTO:ETH",
        "relevance_score": "0.113597",
        "ticker_sentiment_score": "0.1186",
        "ticker_sentiment_label": "Neutral"
      },
      {
        "ticker": "CRYPTO:SHIB",
        "relevance_score": "0.682689",
        "ticker_sentiment_score": "-0.16017",
        "ticker_sentiment_label": "Somewhat-Bearish"
      }
    ]
  },
  {
    "title": "Fair Isaac Fairly Capable To See Further Upside Thanks To Competitive FICO Score Business: Analyst - Fair Isaac  ( NYSE:FICO ) ",
    "url": "https://www.benzinga.com/analyst-ratings/analyst-color/23/09/34287569/fair-isaac-fairly-capable-to-see-further-upside-thanks-to-competitive-fico-score-bu",
    "time_published": "20230906T182613",
    "authors": [
      "Lekha Gupta"
    ],
    "summary": "Raymond James analyst Patrick O'Shaughnessy initiated coverage on Fair Isaac Corp FICO with an Outperform rating and a price target of $1,007. Although FICO's shares have performed well over the past year, the analyst sees further upside and thinks strong execution in the Software segment can ...",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/09/06/fico.png?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "Trading",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Earnings",
        "relevance_score": "0.161647"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.538269"
      }
    ],
    "overall_sentiment_score": 0.364341,
    "overall_sentiment_label": "Bullish",
    "ticker_sentiment": [
      {
        "ticker": "FICO",
        "relevance_score": "0.798255",
        "ticker_sentiment_score": "0.597662",
        "ticker_sentiment_label": "Bullish"
      }
    ]
  },
  {
    "title": "First Solar Stock Up 280% In 14 months. Can It Keep It Up?",
    "url": "https://www.investors.com/news/technology/first-solar-shows-improved-relative-strength-still-shy-of-benchmark-2/",
    "time_published": "20230906T182600",
    "authors": [
      "INVESTOR'S BUSINESS DAILY",
      "Investor's Business Daily",
      "JAMES DETAR"
    ],
    "summary": "Solar energy as a group is in the doldrums. There are bright spots though, like First Solar ( FSLR ) , which got a Relative Strength Rating upgrade Wednesday, from 66 to 75, amid outstanding profit growth. First Solar stock was down Wednesday afternoon.",
    "banner_image": "https://www.investors.com/wp-content/uploads/2023/03/Stock-solarpanels-illustration-01-adobe.jpg",
    "source": "Investors Business Daily",
    "category_within_source": "n/a",
    "source_domain": "www.investors.com",
    "topics": [
      {
        "topic": "Earnings",
        "relevance_score": "0.839681"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.459462"
      },
      {
        "topic": "Manufacturing",
        "relevance_score": "1.0"
      }
    ],
    "overall_sentiment_score": 0.306098,
    "overall_sentiment_label": "Somewhat-Bullish",
    "ticker_sentiment": [
      {
        "ticker": "ARRY",
        "relevance_score": "0.16117",
        "ticker_sentiment_score": "-0.035029",
        "ticker_sentiment_label": "Neutral"
      },
      {
        "ticker": "FSLR",
        "relevance_score": "0.639942",
        "ticker_sentiment_score": "0.493967",
        "ticker_sentiment_label": "Bullish"
      },
      {
        "ticker": "NXT(EXP20091224)",
        "relevance_score": "0.081001",
        "ticker_sentiment_score": "-0.026597",
        "ticker_sentiment_label": "Neutral"
      },
      {
        "ticker": "CRYPTO:NXT",
        "relevance_score": "0.081001",
        "ticker_sentiment_score": "-0.026597",
        "ticker_sentiment_label": "Neutral"
      }
    ]
  },
  {
    "title": "Why Freightos Is Poised To Lead The Digital Revolution In The Freight Industry: Analyst - Freightos  ( NASDAQ:CRGO ) ",
    "url": "https://www.benzinga.com/analyst-ratings/analyst-color/23/09/34286612/why-freightos-is-poised-to-lead-the-digital-revolution-in-the-freight-industry-anal",
    "time_published": "20230906T182356",
    "authors": [
      "Lekha Gupta"
    ],
    "summary": "Oppenheimer analysts, including Jason Helfstein and Jed Kelly, initiated coverage on Freightos Ltd CRGO with an Outperform rating and a price target of $5.",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/09/06/crgo.png?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "Trading",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Earnings",
        "relevance_score": "0.108179"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.108179"
      }
    ],
    "overall_sentiment_score": 0.180865,
    "overall_sentiment_label": "Somewhat-Bullish",
    "ticker_sentiment": [
      {
        "ticker": "CRGO",
        "relevance_score": "0.70749",
        "ticker_sentiment_score": "0.47227",
        "ticker_sentiment_label": "Bullish"
      }
    ]
  },
  {
    "title": "Chennai-based Saas company Zoho says it surpassed 100 mn users globally",
    "url": "https://www.business-standard.com/companies/news/chennai-based-saas-company-zoho-says-it-surpassed-100-mn-users-globally-123090601472_1.html",
    "time_published": "20230906T181837",
    "authors": [
      "Press Trust of India"
    ],
    "summary": "Chennai-headquartered SaaS company Zoho said it has surpassed 10 crore users globally. Zoho has become the first bootstrapped SaaS company to reach the milestone, the firm said in a statement. The company had crossed USD 1 billion in annual revenue in 2022.",
    "banner_image": "https://bsmedia.business-standard.com/_media/bs/img/article/2019-02/14/full/1550162947-7329.jpg?im=FeatureCrop,size=(826,465)",
    "source": "Business Standard",
    "category_within_source": "GoogleRSS",
    "source_domain": "www.business-standard.com",
    "topics": [
      {
        "topic": "Earnings",
        "relevance_score": "0.360215"
      }
    ],
    "overall_sentiment_score": 0.228432,
    "overall_sentiment_label": "Somewhat-Bullish",
    "ticker_sentiment": [

    ]
  },
  {
    "title": "PBR: Build a Strong Energy Portfolio With 3 Stocks",
    "url": "https://stocknews.com/news/pbr-repyy-tgs-build-a-strong-energy-portfolio-with-3-stocks/",
    "time_published": "20230906T181827",
    "authors": [
      "StockNews.com Staff"
    ],
    "summary": "The extended 1 million bpd crude oil production cut by Saudi Arabia is anticipated to fuel further oil price surges, while increased electric power sector demand is set to drive growth in the natural gas industry.",
    "banner_image": "https://stocknews.com/wp-content/uploads/2022/10/iSto_Oil_GasChart.jpg",
    "source": "Stocknews.com",
    "category_within_source": "n/a",
    "source_domain": "stocknews.com",
    "topics": [
      {
        "topic": "Earnings",
        "relevance_score": "0.266143"
      },
      {
        "topic": "Energy & Transportation",
        "relevance_score": "1.0"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.779048"
      }
    ],
    "overall_sentiment_score": 0.249273,
    "overall_sentiment_label": "Somewhat-Bullish",
    "ticker_sentiment": [
      {
        "ticker": "PBR",
        "relevance_score": "0.224903",
        "ticker_sentiment_score": "0.281772",
        "ticker_sentiment_label": "Somewhat-Bullish"
      },
      {
        "ticker": "TGS",
        "relevance_score": "0.343279",
        "ticker_sentiment_score": "0.365327",
        "ticker_sentiment_label": "Bullish"
      },
      {
        "ticker": "SNEGF",
        "relevance_score": "0.025325",
        "ticker_sentiment_score": "0.157313",
        "ticker_sentiment_label": "Somewhat-Bullish"
      }
    ]
  },
  {
    "title": "T-Mobile Will Start to Pay a Dividend. The Market Doesn't Like That Idea.",
    "url": "https://www.barrons.com/articles/t-mobile-stock-price-dividend-e5b7f118",
    "time_published": "20230906T181800",
    "authors": [
      "Nicholas Jasinski"
    ],
    "summary": "T-Mobile Will Start to Pay a Dividend. The Market Doesn't Like That ... ...",
    "banner_image": "https://images.barrons.com/im-377956?width=620&height=413",
    "source": "Barrons",
    "category_within_source": "n/a",
    "source_domain": "www.barrons.com",
    "topics": [
      {
        "topic": "Technology",
        "relevance_score": "1.0"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.360215"
      }
    ],
    "overall_sentiment_score": -0.040281,
    "overall_sentiment_label": "Neutral",
    "ticker_sentiment": [
      {
        "ticker": "TMUS",
        "relevance_score": "0.666827",
        "ticker_sentiment_score": "-0.063121",
        "ticker_sentiment_label": "Neutral"
      },
      {
        "ticker": "VZ",
        "relevance_score": "0.666827",
        "ticker_sentiment_score": "-0.063121",
        "ticker_sentiment_label": "Neutral"
      }
    ]
  },
  {
    "title": "The Peloton Platform is now in the Microsoft Azure Sydney Data Centre",
    "url": "https://www.newswire.ca/news-releases/the-peloton-platform-is-now-in-the-microsoft-azure-sydney-data-centre-824542185.html",
    "time_published": "20230906T181700",
    "authors": [
      "Peloton"
    ],
    "summary": "CALGARY, AB, Sept. 6, 2023 /CNW/ -- Peloton, a global leader in data management software solutions for the energy industry, is excited to announce that the Peloton Platform, a recognized Microsoft solution hosted on Microsoft Azure, is running from Microsoft's Australia East datacenter region ...",
    "banner_image": "https://mma.prnewswire.com/media/1924235/Peloton_NewGreyTagline_RGB_WEB_Logo.jpg?p=facebook",
    "source": "Canada Newswire",
    "category_within_source": "n/a",
    "source_domain": "www.newswire.ca",
    "topics": [
      {
        "topic": "Real Estate & Construction",
        "relevance_score": "0.5"
      },
      {
        "topic": "Technology",
        "relevance_score": "0.5"
      }
    ],
    "overall_sentiment_score": 0.440381,
    "overall_sentiment_label": "Bullish",
    "ticker_sentiment": [
      {
        "ticker": "APG",
        "relevance_score": "0.082963",
        "ticker_sentiment_score": "0.187568",
        "ticker_sentiment_label": "Somewhat-Bullish"
      },
      {
        "ticker": "MSFT",
        "relevance_score": "0.165031",
        "ticker_sentiment_score": "0.199632",
        "ticker_sentiment_label": "Somewhat-Bullish"
      }
    ]
  },
  {
    "title": "Super Micro Computer Unusual Options Activity - Super Micro Computer  ( NASDAQ:SMCI ) ",
    "url": "https://www.benzinga.com/markets/options/23/09/34289709/super-micro-computer-unusual-options-activity",
    "time_published": "20230906T181652",
    "authors": [
      "Benzinga Insights"
    ],
    "summary": "Someone with a lot of money to spend has taken a bullish stance on Super Micro Computer SMCI. We noticed this today when the big position showed up on publicly available options history that we track here at Benzinga. Whether this is an institution or just a wealthy individual, we don't know.",
    "banner_image": "https://cdn.benzinga.com/files/images/story/2023/movers_image_0.jpeg?width=1200&height=800&fit=crop",
    "source": "Benzinga",
    "category_within_source": "Markets",
    "source_domain": "www.benzinga.com",
    "topics": [
      {
        "topic": "Earnings",
        "relevance_score": "0.158519"
      },
      {
        "topic": "Technology",
        "relevance_score": "1.0"
      },
      {
        "topic": "Financial Markets",
        "relevance_score": "0.266143"
      }
    ],
    "overall_sentiment_score": 0.23922,
    "overall_sentiment_label": "Somewhat-Bullish",
    "ticker_sentiment": [
      {
        "ticker": "SMCI",
        "relevance_score": "0.699089",
        "ticker_sentiment_score": "0.304677",
        "ticker_sentiment_label": "Somewhat-Bullish"
      }
    ]
  },
  {
    "title": "Bulk deals | Smallcap World Fund offloads 2.46% stake in Dreamfolks Services, buys over Rs 75 crore shares in Aavas Financiers",
    "url": "https://www.moneycontrol.com/news/business/markets/bulk-deals-smallcap-world-fund-offloads-2-46-stake-in-dreamfolks-services-buys-over-rs-75-crore-shares-in-aavas-financiers-11324991.html",
    "time_published": "20230906T181650",
    "authors": [

    ],
    "summary": "Smallcap World Fund offloaded shares in Dreamfolks Services, and Shriram Finance, but bought in Aavas Financiers via block deals.",
    "banner_image": "https://images.moneycontrol.com/static-mcnews/2023/09/Image1006092023-1.jpg",
    "source": "Money Control",
    "category_within_source": "Buzzing Stocks",
    "source_domain": "www.moneycontrol.com",
    "topics": [
      {
        "topic": "Financial Markets",
        "relevance_score": "0.316726"
      }
    ],
    "overall_sentiment_score": 0.285925,
    "overall_sentiment_label": "Somewhat-Bullish",
    "ticker_sentiment": [

    ]
  }
]

export const GET: APIRoute = async () => {
  // const topics = 'earnings,mergers_and_acquisitions,financial_markets,economy_fiscal,economy_monetary,economy_macro,energy_transportation,finance,life_sciences,manufacturing,real_estate,retail_wholesale,technology';
  // const sorting = 'RELEVANCE';
  // const limit = '20'
  // const res = await fetch(`${import.meta.env.ALPHA_VANTAGE_API_URL}${ALPHA_VANTAGE_FUNCTIONS.NEWS_SENTIMENT}&topics=${topics}&sort=${sorting}&limit=${limit}&apikey=${import.meta.env.ALPHA_VANTAGE_API_TOKEN}`)

  // if (!res.ok) {
  //   return new Response(null, {
  //     status: 500,
  //     statusText: 'Server Error'
  //   });
  // }

  // const json = await res.json();

  // if ("Note" in json || "Information" in json) {
  //   return new Response(null, {
  //     status: 500,
  //     statusText: `API Quote Reached: ${json['Note']}`
  //   });
  // }

  // const articlesBullish = json.feed
  //   .filter(article => article.overall_sentiment_score >= .15)
  //   .sort((a, b) => b.overall_sentiment_score - a.overall_sentiment_score);

  // const articlesBearish = json.feed
  //   .filter(article => article.overall_sentiment_score <= -.15)
  //   .sort((a, b) => a.overall_sentiment_score - b.overall_sentiment_score);

  try {
    const parsed = parse(NewsSentimentFeedSchema, demoFeed);

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
