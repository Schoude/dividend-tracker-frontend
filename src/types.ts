interface Order {
  amount_changed: number;
  id: number;
  instrument_type: string;
  isin: string;
  name: string;
  order_id: string;
  price: number;
  timestamp: number;
  type: string;
}

export type Orders = Order[];

interface Dividend {
  isin: string;
  payment_date_iso: string;
  payment_date_unix: number;
  ex_date_iso: string;
  ex_date_unix: number;
  amount: number;
  info: string;
}

export interface StockFullInfo {
  isin: string;
  intl_symbol: string;
  name: string;
  price_snapshot: number;
  ipo_date: number;
  type_id: 'stock';
  exchange_id: string;
  image_id: string;
  distribution_frequency: string;
  company_events: CompanyEvent[];
  dividends_stock: Dividend[];
  company_infos: CompanyInfos;
  analyst_ratings: AnalystRatings;
  sectors: Sector[];
}

export interface StatusStock {
  name: string;
  isin: string;
  totalAmount: number;
  averagePrice: number;
  currentPrice: number;
  averageValue: number;
  currentValue: number;
  percentChange: number;
  valueChange: number;
}

type StatusFund = StatusStock;

export type StocksStatus = StatusStock[];

export interface Fund {
  name: string;
  description: string;
  distribution_frequency: string;
  exchange_id: string;
  focus: string;
  fund_name: string;
  id: number;
  image_id: string;
  isin: string;
  price_snapshot: number;
  type_id: 'fund';
  dividends_fund: Dividend[];
}

export type FundsStatus = StatusFund[];

interface DividendOfMonth {
  amountPayout: number;
  info: string;
  instrumentInfo: StatusStock | undefined;
  isin: string;
  payment_date_iso: string;
  payment_date_unix: number;
  ex_date_iso: string;
  amount: number;
  ownedAtPayout: number;
}

export type DividendsMonthly = DividendOfMonth[];

export interface PortfolioDetailResponse {
  data: {
    id: number;
    name: string;
    stocks: StockFullInfo[];
    funds: Fund[];
    stocksStatus: StocksStatus;
    fundsStatus: FundsStatus;
    orders: Orders;
  }
}

export interface AnalystRatings {
  target_price_high: number;
  target_price_average: number;
  target_price_low: number;
  recommendations_buy: number;
  recommendations_outperform: number;
  recommendations_hold: number;
  recommendations_underperform: number;
}

export interface CompanyEvent {
  title: string;
  description: string;
  timestamp: number;
}

export interface CompanyInfos {
  isin: string;
  name: string;
  description: string;
  yearfounded: number;
  peratiosnapshot: null;
  pbratiosnapshot: number;
  dividendyieldsnapshot: number;
  marketcapsnapshot: null;
  beta: number;
  countrycode: string;
  ceoname: null;
  cfoname: string;
  cooname: null;
  employeecount: number;
  eps: number;
}

export interface Sector {
  name: string;
  icon: string;
}

type InstrumentType = 'stock' | 'fund';
