export function useDataRefresh() {
  async function stocksRefresh(): Promise<Response> {
    console.log('stocksRefresh called');
    return new Response();
  }

  async function stocksDividendsRefresh(): Promise<Response> {
    console.log('stocksDividendsRefresh called');
    return new Response();
  }

  async function fundsRefresh(): Promise<Response> {
    console.log('fundsRefresh called');
    return new Response();
  }

  async function fundsDividendsRefresh(): Promise<Response> {
    console.log('fundsDividendsRefresh called');
    return new Response();
  }

  async function watchlistSync(): Promise<Response> {
    console.log('watchlistSync called');
    return new Response();
  }

  return {
    stocksRefresh,
    stocksDividendsRefresh,
    fundsRefresh,
    fundsDividendsRefresh,
    watchlistSync,
  }
}
