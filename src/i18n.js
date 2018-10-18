import i18n from 'i18next';
import en from './languages/en';

export default function init() {
  return i18n.init({
    lng: 'en',
    whitelist: ['en'],
    fallbackLng: 'en',
    debug: process.env.NODE_ENV !== 'production',
    resources: {
      en,
    },
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    // react i18next special options (optional)
    react: {
      wait: false, // set to true if you like to wait for loaded in every translated hoc
      nsMode: 'default ', // set it to fallback to let passed namespaces to translated hoc act as fallbacks
    },
  }, error => {
    if (error) {
      console.log('translation errored', error);
    }
  });
}
