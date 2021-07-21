/**
 * Entry application component used to compose providers and render Routes.
 * */

import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "../app/Routes";
import { I18nProvider } from "../_metronic/i18n";
import { LayoutSplashScreen, MaterialThemeProvider } from "../_metronic/layout";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/apm";
import { AuthenticationProvider } from "./context/AuthenticationContext";
import { isAuthenticate } from "./utils/authenticate";
import AppDirection from "./components/AppDirection";

import getList from "./utils/i18next";

Sentry.init({
   dsn: "https://bc196634740145339f746fdfdc7b10e9@sentry.dropp.ir/19",
   integrations: [new Integrations.Tracing()],
   tracesSampleRate: 1.0,
});

export default function App({ basename }) {
   const [isAuth, setIsAuth] = useState(isAuthenticate());

   const [isLanguageReady, setIsLanguageReady] = useState(false);

   useEffect(() => {
      const setupLanguage = async () => {
         setIsLanguageReady(await getList());
      };

      setupLanguage();
   }, []);

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
