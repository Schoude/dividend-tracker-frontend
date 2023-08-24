import { inject, onBeforeMount, reactive, ref, watch } from 'vue';
import { keyTRSession } from '../utils/provide-keys';

export function useTRAuth(urlBase: string) {
  const show2FAInput = ref(false);
  const loginData2fa = reactive({
    processId: '',
    loginCookies: '',
  });
  const trSession = inject(keyTRSession)!;

  async function login() {
    const res = await fetch(`${urlBase}/api/tr/login`);

    if (!res.ok) {
      show2FAInput.value = true;

      const json = await res.json() as {
        data: {
          processId: string;
          loginCookies: string;
        }
      };
      loginData2fa.processId = json.data.processId;
      loginData2fa.loginCookies = json.data.loginCookies;

      trSession.value = null;
    }
  }

  async function on2faPinSend(pin: string) {
    if (pin === '') {
      return;
    }

    const res = await fetch(`${urlBase}/api/tr/login/2fa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...loginData2fa,
        pin,
      })
    });

    if (!res.ok) {
      console.log('Failed to auth');

      return;
    }

    const json = await res.json() as {
      data: {
        trSession: string;
      }
    };

    trSession.value = json.data.trSession;
    show2FAInput.value = false;
    loginData2fa.processId = '';
    loginData2fa.loginCookies = '';
  }

  watch(trSession, (sessionKey) => {
    if (sessionKey) {
      localStorage.setItem('tr_session', sessionKey);
    } else {
      localStorage.removeItem('tr_session');
      login();
    }
  })

  onBeforeMount(async () => {
    if (trSession.value != null) {
      console.info('%ctr_session already present.', 'color: yellow; background-color: black; padding: .2rem;');

      return;
    }

    login();
  })

  return {
    show2FAInput,
    loginData2fa,
    on2faPinSend,
  }
}
