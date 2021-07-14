/**
 * Entry application component used to compose providers and render Routes.
 * */

import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "../app/Routes";
import { I18nProvider } from "../_metronic/i18n";
import { LayoutSplashScreen, MaterialThemeProvider } from "../_metronic/layout";

import { AuthenticationProvider } from "./context/AuthenticationContext";

import { isAuthenticate } from "./utils/authenticate";

export default function App({ basename }) {
   const [isAuth, setIsAuth] = useState(isAuthenticate());

   return (
      <React.Suspense fallback={<LayoutSplashScreen />}>
         <BrowserRouter basename={basename}>
            <MaterialThemeProvider>
               <I18nProvider>
                  <AuthenticationProvider value={{ isAuth, setIsAuth }}>
                     <Routes />
                  </AuthenticationProvider>
               </I18nProvider>
            </MaterialThemeProvider>
         </BrowserRouter>
      </React.Suspense>
   );
}
