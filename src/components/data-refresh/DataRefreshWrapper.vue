<script setup lang='ts'>
import { provide, ref } from 'vue';
import LoginTR from '../auth/LoginTR.vue';
import ButtonRefresh from "./ButtonRefresh.vue";
import {keyRefreshing, keyTRSession} from '../../utils/provide-keys';
import {useDataRefresh} from '../../composables/data-refresh';

defineProps<{urlBase: string}>();
const trSession = ref<null | string>(localStorage.getItem('tr_session'));
const refreshing = ref(false);

provide(keyTRSession, trSession);
provide(keyRefreshing, refreshing);

// TODO: add useRefreshData composition function -> define each function to call there
const {
  stocksRefresh,
  stocksDividendsRefresh,
  fundsDividendsRefresh,
  fundsRefresh,
  watchlistSync,
} = useDataRefresh();

</script>

<template>
  <LoginTR :url-base="urlBase" />

  <section class="container-refresh stocks">
    <h2>Aktien</h2>
    <div class="inner">
      <ButtonRefresh :update-function="stocksRefresh">
        Aktien aktualisieren
      </ButtonRefresh>
      <ButtonRefresh :update-function="stocksDividendsRefresh">
        Aktien-Dividenden aktualisieren
      </ButtonRefresh>
    </div>
  </section>

  <section class="container-refresh funds">
    <h2>ETFs</h2>
    <div class="inner">
      <ButtonRefresh :update-function="fundsRefresh">
        ETF aktualisieren
      </ButtonRefresh>
      <ButtonRefresh :update-function="fundsDividendsRefresh">
        ETF-Dividenden aktualisieren
      </ButtonRefresh>
    </div>
  </section>

  <section class="container-refresh sync">
    <h2>TR-Watchlist</h2>
    <div class="inner">
      <ButtonRefresh :update-function="watchlistSync">
        Watchlist synchronisieren
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
</style>
