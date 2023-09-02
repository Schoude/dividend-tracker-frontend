export function useDataRefresh(urlBase: string) {
  async function stocksPriceRefresh(): Promise<Response | void> {
    try {
      return fetch(`${urlBase}/api/refresh/prices?type=stocks`);
    } catch (error) {
      console.log(error);
    }
  }

  async function stocksInfoRefresh(): Promise<Response | void> {
    console.log('stocksInfoRefresh called');

    try {
      return fetch(`${urlBase}/api/refresh/stocks/infos`);
    } catch (error) {
      console.log(error);
    }
  }

  async function stocksDividendsRefresh(): Promise<Response | void> {
    console.log('stocksDividendsRefresh called');

    try {
      return fetch(`${urlBase}/api`);
    } catch (error) {
      console.log(error);
    }
  }

  async function fundsPriceRefresh(): Promise<Response | void> {
    try {
      return fetch(`${urlBase}/api/refresh/prices?type=funds`);
    } catch (error) {
      console.log(error);
    }
  }

  async function fundsDividendsRefresh(): Promise<Response | void> {
    console.log('fundsDividendsRefresh called');

    try {
      return fetch(`${urlBase}/api`);
    } catch (error) {
      console.log(error);
    }
  }

  async function watchlistSync(): Promise<Response | void> {
    console.log('watchlistSync called');

    try {
      return fetch(`${urlBase}/api`);
    } catch (error) {
      console.log(error);
    }
  }

  async function exchangeRatesUpdate(): Promise<Response | void> {
    console.log('exchangeRatesUpdate called');

    try {
      return fetch(`${urlBase}/api/refresh/exchange-rates`);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    stocksPriceRefresh,
    stocksInfoRefresh,
    stocksDividendsRefresh,
    fundsPriceRefresh,
    fundsDividendsRefresh,
    watchlistSync,
    exchangeRatesUpdate,
  }
}
