import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
const i18n = i18next;
const options = {
    interpolation: {
        escapeValue: false
    },
    resources: {
        en: {
            common: en,
        },
        es: {
            common: es,
        },
        fr: {
            common: fr,
        }
    },
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
};
i18next
    .use(initReactI18next)
    .use(LanguageDetector)
    .init(options);
export default i18n;
//# sourceMappingURL=index.js.map