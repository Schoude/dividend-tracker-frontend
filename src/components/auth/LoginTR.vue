<script setup lang='ts'>
import { inject, onBeforeMount, reactive, ref, watch } from 'vue';
import { keyTRSession } from '../../utils/provide-keys';

const props = defineProps<{urlBase: string}>();
const pin = ref('');
const show2FAInput = ref(true);
const loginData2fa = reactive({
  processId: '',
  loginCookies: '',
});

const trSession = inject(keyTRSession)!;

function onInput($event: Event) {
  const target = $event.target as HTMLInputElement ;
  pin.value = target.value;
}

watch(trSession, (sessionKey) => {
  if (sessionKey) {
    localStorage.setItem('tr_session', sessionKey);
  } else {
    localStorage.removeItem('tr_session');
  }
})

onBeforeMount(async () => {
  if (trSession.value != null) {
    console.log('session already there');

    return;
  }

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

    trSession.value = null;
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
