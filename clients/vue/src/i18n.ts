import Vue from 'vue';

import VueI18n from 'vue-i18n';

import { messages } from '@/locales/message';

Vue.use(VueI18n);

export default new VueI18n({
  locale: 'en', // set locale
  messages, // set locale messages
});