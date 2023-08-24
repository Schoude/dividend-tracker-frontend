export function useDataRefresh() {
  async function stocksRefresh() {
    console.log('stocksRefresh called');
  }

  async function stocksDividendsRefresh() {
    console.log('stocksDividendsRefresh called');
  }

  async function fundsRefresh() {
    console.log('fundsRefresh called');
  }

  async function fundsDividendsRefresh() {
    console.log('fundsDividendsRefresh called');
  }

  async function watchlistSync() {
    console.log('watchlistSync called');

  }

  return {
    stocksRefresh,
    stocksDividendsRefresh,
    fundsRefresh,
    fundsDividendsRefresh,
    watchlistSync,
  }
}
