import type { InjectionKey, Ref } from 'vue';

export const keyTRSession = Symbol('tr_session') as InjectionKey<Ref<string | null>>;
