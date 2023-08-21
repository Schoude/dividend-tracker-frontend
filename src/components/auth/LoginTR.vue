<script setup lang='ts'>
import { onBeforeMount, reactive, ref } from 'vue';

const props = defineProps<{urlBase: string}>();
const pin = ref('');
const show2FAInput = ref(false);
const loginData2fa = reactive({
  processId: '',
  loginCookies: '',
});
const trSession = ref('');

onBeforeMount(async () => {
  const res = await fetch(`${props.urlBase}/api/tr/login`);

  if (!res.ok) {
    show2FAInput.value = true;
    const json = await res.json() as {
      data: {
        processId: string;
        loginCookies: string;
      }
    };
    loginData2fa.processId= json.data.processId;
    loginData2fa.loginCookies= json.data.loginCookies;
  }
})

async function on2faPinSend() {
  if (pin.value === '') {
    return;
  }

  const res = await fetch(`${props.urlBase}/api/tr/login/2fa`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...loginData2fa,
      pin: pin.value.toString(),
    })
  });

  if (!res.ok) {
    console.log('Failed to auth');

    return;
  }

  const json = await res.json() as {
    data: {
      trSession: string;
  }};

  trSession.value = json.data.trSession;
}

</script>

<template>
  <section class="login-tr">
    <form v-if="show2FAInput && loginData2fa.processId" @submit.prevent="on2faPinSend">
      <label for="pin">
        <span>2FA-Pin</span>
        <input type="number" name="pin" id="pin" v-model="pin" min="0" max="4" placeholder="1234">
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
