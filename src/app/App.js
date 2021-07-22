/**
 * Entry application component used to compose providers and render Routes.
 * */

import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "../app/Routes";
import { I18nProvider } from "../_metronic/i18n";
import { LayoutSplashScreen, MaterialThemeProvider } from "../_metronic/layout";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/apm";
import { AuthenticationProvider } from "./context/AuthenticationContext";
import { isAuthenticate } from "./utils/authenticate";
import AppDirection from "./components/AppDirection";
import i18next from "i18next";
import initI18next from "./utils/i18next";

import { createLanguage, editLanguage } from "./services/language.service";
import objectToArray from "./utils/objectToArray";
import convertLang from "./utils/convertLang";
import faMessages from "../_metronic/i18n/messages/fa.json";
import faErrors from "../_metronic/i18n/errors/fa-errors.json";
import enMessages from "../_metronic/i18n/messages/en.json";
import enErrors from "../_metronic/i18n/errors/en-errors.json";

initI18next();

Sentry.init({
   dsn: "https://bc196634740145339f746fdfdc7b10e9@sentry.dropp.ir/19",
   integrations: [new Integrations.Tracing()],
   tracesSampleRate: 1.0,
});

// svg iran: 136-iran.svg
// svg usa: 226-united-states.svg

////

// const editLng = async () => {
//    const editedLng = {
//       translations: objectToArray({
//          messages: objectToArray(enMessages),
//          errors: objectToArray(enErrors),
//       }),
//    };

//    const response = await editLanguage("60f966ae98d3b600affc8898", editedLng);
//    console.log(response);
// };

// editLng();

// ///

// const createLng = async () => {
//    const newLng = {
//       name: "Persian - فارسی",
//       flag: "136-iran.svg",
//       language: "fa",
//       status: "published",
//       direction: "rtl",
//       platform: "adminPanel",
//       isDefault: true,
//       translations: objectToArray({
//          messages: objectToArray(faMessages),
//          errors: objectToArray(faErrors),
//       }),
//    };
//    const response = await createLanguage(newLng);
//    console.log(response);
// };

// createLng();

// console.log(
//    convertLang(
//       objectToArray({
//          messages: objectToArray(enMessages),
//          errors: objectToArray(enErrors),
//       })
//    )
// );

export default function App({ basename }) {
   const [isAuth, setIsAuth] = useState(isAuthenticate());

   const [isLanguageReady, setIsLanguageReady] = useState(false);

   i18next.on("initialized", () => {
      setIsLanguageReady(true);
   });

   return (
      <React.Suspense fallback={<LayoutSplashScreen />}>
         <BrowserRouter basename={basename}>
            <MaterialThemeProvider>
               {isLanguageReady && (
                  <I18nProvider>
                     <AppDirection />
                     <AuthenticationProvider value={{ isAuth, setIsAuth }}>
                        <Routes />
                     </AuthenticationProvider>
                  </I18nProvider>
               )}
            </MaterialThemeProvider>
         </BrowserRouter>
      </React.Suspense>
   );
}
