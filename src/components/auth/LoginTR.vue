<script setup lang='ts'>
import { ref } from 'vue';
import { useTRAuth } from '../../composables/tr-auth';

const props = defineProps<{urlBase: string}>();
const {
  loginData2fa,
  show2FAInput,
  on2faPinSend,
} = useTRAuth(props.urlBase);

const pin = ref('');

function onInput($event: Event) {
  const target = $event.target as HTMLInputElement ;
  pin.value = target.value;
}

async function onSubmit() {
  await on2faPinSend(pin.value);
}
</script>

<template>
  <section class="login-tr">
    <form v-if="show2FAInput && loginData2fa.processId" @submit.prevent="onSubmit">
      <label for="pin">
        <span>2FA-Pin</span>
        <input type="number" name="pin" id="pin" :value="pin" @input="onInput" minlength="0" maxlength="4" placeholder="1234">
      </label>
      <button type="submit" class="btn">Send PIN</button>
    </form>
  </section>
</template>

<style scoped>
label {
  & span {
    display: block;
  }
}
</style>
