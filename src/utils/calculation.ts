import type { FundFullInfo, FundsStatus, PortfolioDetailResponse, StockFullInfo, StocksStatus } from '../types';
import { formatCurrency } from './intl';

export function getValueOfPortfolio(
  stocksStatus: StocksStatus,
  fundsStatus: FundsStatus
) {
  const totalStocksValue = stocksStatus.reduce((acc, stock) => {
    acc += stock.currentValue;

    return acc;
  }, 0);

  const totalFundsValue = fundsStatus.reduce((acc, fund) => {
    acc += fund.currentValue;

    return acc;
  }, 0);

  const totalValue = totalStocksValue + totalFundsValue;

  return {
    totalStocksValue: formatCurrency(totalStocksValue),
    totalFundsValue: formatCurrency(totalFundsValue),
    totalValue: formatCurrency(totalValue)
  }
}

export function getPercentage(value1: number, value2: number) {
  return `${((value1 / value2) * 100).toFixed(2)}%`;
}

export function getAmountInPortfolio(
  portfolio: PortfolioDetailResponse,
  instrument: StockFullInfo | FundFullInfo
) {
  let amount = 0;
  if (instrument.type_id === "stock") {
    amount = portfolio.data.stocksStatus.find(
      (stock) => stock.isin === instrument.isin
    )?.totalAmount!;
  } else {
    amount = portfolio.data.fundsStatus.find(
      (fund) => fund.isin === instrument.isin
    )?.totalAmount!;
  }

  return amount.toFixed(2);
}
