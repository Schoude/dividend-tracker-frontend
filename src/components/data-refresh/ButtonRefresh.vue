<script setup lang='ts'>
import { inject } from 'vue';
import { keyRefreshing } from '../../utils/provide-keys';

const emit = defineEmits<{
  (event: 'error:auth'): void
}>();

const props = defineProps<{
  updateFunction: () => Promise<Response| void>;
}>();
const refreshing = inject(keyRefreshing)!;

async function onUpdateStocksClick() {
  if (refreshing.value) {
    return;
  }

  refreshing.value = true;

  try {
    const res = await props.updateFunction();

    if (
      typeof res === 'object' &&
      'ok' in res &&
      !res.ok
    ) {
      if (res.status === 401) {
        emit('error:auth')
      }
    }
  } catch (error) {
    console.log(error);
  } finally {
    refreshing.value = false;
  }
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

  &:not(:disabled):hover {
    background-color: hsl(0, 0%, 7%);
  }
}
</style>
