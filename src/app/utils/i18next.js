import { version } from "../../../package.json";
import i18next from "i18next";
import ChainedBackend from "i18next-chained-backend";
import HttpBackend from "i18next-http-backend";
import LocalStorageBackend from "i18next-localstorage-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import convertLang from "./convertLang";

import { getLanguageList } from "../services/language.service";

import urls from "../services/urls.json";

const fallbackLng = ["en"];
const availableLanguages = ["fa", "en"];

// const fallbackLng = [];
// const availableLanguages = [];

const detectionOptions = {
   // order and from where user language should be detected
   order: [
      "querystring",
      "cookie",
      "localStorage",
      "sessionStorage",
      "navigator",
      "htmlTag",
      "path",
      "subdomain",
   ],

   // keys or params to lookup language from
   lookupQuerystring: "lng",
   lookupCookie: "i18next",
   lookupLocalStorage: "i18nextLng",
   lookupSessionStorage: "i18nextLng",
   lookupFromPathIndex: 0,
   lookupFromSubdomainIndex: 0,

   // cache user language on
   caches: ["localStorage", "cookie"],
   //  excludeCacheFor: ["cimode"], // language to not persist (cookie, localStorage)

   // optional expire and domain for set cookie
   cookieMinutes: 10,
   cookieDomain: "myDomain",

   // optional htmlTag with lang attribute, the default is:
   htmlTag: document.documentElement,

   // only detect language that are in the whitelist
   checkWhitelist: true,

   // optional set cookie options, reference: [MDN Set-Cookie docs](https://...)
   // cookieOptions:{path:"/", sameSite:"strict"}
};

const getList = async () => {
   const response = await getLanguageList();
   if (response?.data?.success) {
      response.data.data.forEach((lang, i) => {
         if (lang.isDefault) fallbackLng.push(lang.language);

         availableLanguages.push(lang.language);
      });

      i18next
         .use(ChainedBackend)
         .use(LanguageDetector)
         .use(initReactI18next)
         .init({
            fallbackLng,
            debug: true,

            backend: {
               backends: [LocalStorageBackend, HttpBackend],
               backendOptions: [
                  {
                     expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
                     defaultVersion: version,
                  },
                  {
                     loadPath: `${process.env.REACT_APP_BASE_URL}${urls.GET_LANGUAGE}/get?language={{lng}}&platform=adminPanel`,

                     parse: data =>
                        convertLang(JSON.parse(data).data.translations),
                  },
               ],
            },
            whitelist: availableLanguages,
            detection: detectionOptions,

            interpolation: {
               escapeValue: false,
            },
         });
   }
   return true;
};
export default getList;

// i18next
//    .use(ChainedBackend)
//    .use(LanguageDetector)
//    .use(initReactI18next)
//    .init({
//       fallbackLng,
//       debug: true,

//       backend: {
//          backends: [LocalStorageBackend, HttpBackend],
//          backendOptions: [
//             {
//                expirationTime: 7 * 24 * 60 * 60 * 1000, // 7 days
//                defaultVersion: version,
//             },
//             {
//                loadPath: `${process.env.REACT_APP_BASE_URL}${urls.GET_LANGUAGE}/get?language={{lng}}&platform=adminPanel`,

//                parse: data => convertLang(JSON.parse(data).data.translations),
//             },
//          ],
//       },
//       whitelist: availableLanguages,
//       detection: detectionOptions,

//       interpolation: {
//          escapeValue: false,
//       },
//    });
