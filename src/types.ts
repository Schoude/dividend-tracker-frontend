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

export interface Stock {
  isin: string;
  dividends_stock: Dividend[];
}

export interface StatusStock {
  name: string;
  isin: string;
  totalAmount: number;
  currentValue: number;
}

type StatusFund = StatusStock;

export type StocksStatus = StatusStock[];

export interface Fund {
  isin: string;
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
    name: string;
    stocks: Stock[];
    funds: Fund[];
    stocksStatus: StocksStatus;
    fundsStatus: FundsStatus;
    orders: Orders;
  }
}
