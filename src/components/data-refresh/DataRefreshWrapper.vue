<script setup lang='ts'>
import { provide, ref } from 'vue';
import LoginTR from '../auth/LoginTR.vue';
import ButtonRefresh from "./ButtonRefresh.vue";
import {keyRefreshing, keyTRSession} from '../../utils/provide-keys';

defineProps<{urlBase: string}>();
const trSession = ref<null | string>(localStorage.getItem('tr_session'));
const refreshing = ref(false);

provide(keyTRSession, trSession);
provide(keyRefreshing, refreshing);

</script>

<template>
  <LoginTR v-if="trSession == null" :url-base="urlBase" />

  <section class="container-refresh stocks">
    <h2>Aktien</h2>
    <ButtonRefresh :update-function="async () => (console.log('cool!'))">
      Aktien aktualisieren
    </ButtonRefresh>
    <ButtonRefresh :update-function="async () => (console.log('cool!'))">
      Aktien-Dividenden aktualisieren
    </ButtonRefresh>
  </section>

  <section class="container-refresh funds">
    <h2>ETFs</h2>
    <ButtonRefresh :update-function="async () => (console.log('cool!'))">
      ETF aktualisieren
    </ButtonRefresh>
    <ButtonRefresh :update-function="async () => (console.log('cool!'))">
      ETF-Dividenden aktualisieren
    </ButtonRefresh>
  </section>
</template>

<style scoped>
.container-refresh {
  & + & {
    margin-block-start: 1.5rem;
  }

  & button + button {
    margin-inline-start: 1rem;
  }
}
</style>
