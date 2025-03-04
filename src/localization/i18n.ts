import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import esp from './esp.json';

const resources = {
  esp: {
    translation: esp,
  },
};

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources,
  lng: 'esp',
});

export default i18n;
