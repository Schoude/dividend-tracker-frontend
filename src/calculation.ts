import { formatCurrency } from './intl';

export function getValueOfPortfolio(
  stocksStatus: { currentValue: number }[],
  fundsStatus: { currentValue: number }[]
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
