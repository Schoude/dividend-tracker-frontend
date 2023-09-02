<script setup lang='ts'>
import { onBeforeMount, provide, ref } from 'vue';
import LoginTR from '../auth/LoginTR.vue';
import ButtonRefresh from "./ButtonRefresh.vue";
import {keyRefreshing, keyTRSession} from '../../utils/provide-keys';
import {useDataRefresh} from '../../composables/data-refresh';
import type { ExchangeRates, ExchangeRatesResponse } from '../../types';
import { formatCurrency } from '../../utils/intl';

const props = defineProps<{
  urlBase: string;
}>();
const trSession = ref<null | string>(null);
const refreshing = ref(false);
const exchangeRates = ref<ExchangeRates | null>(null);

onBeforeMount(async () => {
  trSession.value = localStorage.getItem('tr_session');
  exchangeRates.value = (await (
  await fetch(`${props.urlBase}/api/exchange-rates`)
).json()as ExchangeRatesResponse).data ;
})

provide(keyTRSession, trSession);
provide(keyRefreshing, refreshing);

const {
  stocksPriceRefresh,
  stocksInfoRefresh,
  stocksDividendsRefresh,
  fundsDividendsRefresh,
  fundsPriceRefresh,
  watchlistSync,
  exchangeRatesUpdate,
} = useDataRefresh(props.urlBase);

function onAuthError () {
  trSession.value = null;
}

</script>

<template>
  <LoginTR :url-base="urlBase" />

  <section class="container-refresh stocks">
    <h2>Aktien</h2>
    <div class="inner">
      <ButtonRefresh
        :update-function="stocksPriceRefresh"
        @error:auth="onAuthError"
      >
        Aktien-Preise aktualisieren
      </ButtonRefresh>
      <ButtonRefresh
        :update-function="stocksInfoRefresh"
        @error:auth="onAuthError"
      >
        Aktien-Infos aktualisieren
      </ButtonRefresh>
      <ButtonRefresh
        :update-function="stocksDividendsRefresh"
        @error:auth="onAuthError"
      >
        Aktien-Dividenden aktualisieren
      </ButtonRefresh>
    </div>
  </section>

  <section class="container-refresh funds">
    <h2>ETFs</h2>
    <div class="inner">
      <ButtonRefresh
        :update-function="fundsPriceRefresh"
        @error:auth="onAuthError"
      >
        ETF Preise aktualisieren
      </ButtonRefresh>
      <ButtonRefresh
        :update-function="fundsDividendsRefresh"
        @error:auth="onAuthError"
      >
        ETF-Dividenden aktualisieren
      </ButtonRefresh>
    </div>
  </section>

  <section class="container-refresh watchlist-sync">
    <h2>TR-Watchlist</h2>
    <div class="inner">
      <ButtonRefresh
        :update-function="watchlistSync"
        @error:auth="onAuthError"
      >
        Watchlist synchronisieren
      </ButtonRefresh>
    </div>
  </section>

  <section class="container-refresh exchange-rates">
    <h2>Wechselkurse</h2>
    <article class="info" v-if="exchangeRates">
      <dl>
        <dt>USD/EUR:</dt>
        <dd>{{ formatCurrency(exchangeRates.usd_eur, 'EUR', 'de-DE') }}</dd>
        <dt>EUR/USD:</dt>
        <dd>{{ formatCurrency(exchangeRates.eur_usd) }}</dd>
        <dt>Letzte Aktualisierung:</dt>
        <dd>{{ new Date(exchangeRates.updated_at).toLocaleString() }}</dd>
      </dl>
    </article>
    <div class="inner">
      <ButtonRefresh
        :update-function="exchangeRatesUpdate"
        @update:exchange-rates="(payload) => exchangeRates = payload"
        @error:auth="onAuthError"
      >
        Wechselkurse aktualisieren
      </ButtonRefresh>
    </div>
  </section>
</template>

<style scoped>
.container-refresh {
  & + & {
    margin-block-start: 1.5rem;
  }

  .inner {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }
}

dl {
  display: grid;
  grid-template-columns: max-content 1fr;
  column-gap: 0.75rem;
  margin: 0;
}

dd {
  margin: 0;
  font-weight: 200;
}
</style>
