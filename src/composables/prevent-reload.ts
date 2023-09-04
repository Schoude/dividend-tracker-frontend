import { onMounted, ref } from 'vue';

export function usePreventReload() {
  const preventPredicate = ref(false);

  onMounted(() => {
    window.onbeforeunload = function (e) {
      if (preventPredicate.value) {
        return '';
      }
    };
  })

  return {
    preventPredicate,
  }
}
