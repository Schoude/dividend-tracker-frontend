<script setup lang='ts'>
import { inject } from 'vue';
import { keyRefreshing } from '../../utils/provide-keys';

const props = defineProps<{
  updateFunction: () => Promise<void>;
}>();
const refreshing = inject(keyRefreshing)!;

async function onUpdateStocksClick() {
  if (refreshing?.value) {
    return;
  }

  props.updateFunction();
}
</script>

<template>
  <button
    class="btn-refresh"
    type="button"
    @click="onUpdateStocksClick"
    :disabled="refreshing"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn-refresh {
  background-color: hsl(0, 0%, 4%);
  border: 1px solid rgb(53, 53, 53);
  border-radius: 4px;
  transition: background-color 260ms ease-out;
  padding: .25rem .65rem;

  &:hover {
    background-color: hsl(0, 0%, 7%);
  }
}
</style>
