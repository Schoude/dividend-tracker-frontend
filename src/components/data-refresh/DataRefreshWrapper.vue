<script setup lang='ts'>
import { provide, ref } from 'vue';
import LoginTR from '../auth/LoginTR.vue';
import {keyTRSession} from '../../utils/provide-keys';

defineProps<{urlBase: string}>();
const trSession = ref<null | string>(localStorage.getItem('tr_session'));

provide(keyTRSession, trSession);

</script>

<template>
  <LoginTR :url-base="urlBase" />
</template>

<style scoped>
</style>
