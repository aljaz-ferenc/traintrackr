import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import sl from "./locales/sl/translation.json";
import en from "./locales/en/translation.json";

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		debug: true,
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		},
		resources: {
			en: {
				translation: en,
			},
			sl: {
				translation: sl,
			},
		},
	});

export default i18n;
