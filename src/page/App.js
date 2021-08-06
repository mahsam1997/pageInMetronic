/**
 * Entry application component used to compose providers and render Routes.
 * */

import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "../app/Routes";
import { LayoutSplashScreen, MaterialThemeProvider } from "../_metronic/layout";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/apm";
import { ToastContainer } from "react-toastify";
import { AuthenticationProvider } from "./context/AuthenticationContext";
import { isAuthenticate } from "./utils/authenticate";
import AppDirection from "./components/AppDirection";
import i18next from "i18next";
import initI18next from "./utils/initI18next";

initI18next();

Sentry.init({
   dsn: "https://bc196634740145339f746fdfdc7b10e9@sentry.dropp.ir/19",
   integrations: [new Integrations.Tracing()],
   tracesSampleRate: 1.0,
});

export default function App({ basename }) {
   const [isAuth, setIsAuth] = useState(isAuthenticate());

   const [isLanguageReady, setIsLanguageReady] = useState(false);

   const isLtrDir = i18next.dir() === "ltr";

   i18next.on("initialized", () => {
      setIsLanguageReady(true);
   });

   return (
      <React.Suspense fallback={<LayoutSplashScreen />}>
         <BrowserRouter basename={basename}>
            <MaterialThemeProvider>
               {isLanguageReady && (
                  <>
                     <AppDirection />
                     <AuthenticationProvider value={{ isAuth, setIsAuth }}>
                        <Routes />
                        <ToastContainer
                           position={isLtrDir ? "bottom-left" : "bottom-right"}
                           autoClose={5000}
                           hideProgressBar={false}
                           newestOnTop={false}
                           closeOnClick
                           rtl={isLtrDir ? false : true}
                           pauseOnFocusLoss
                           draggable
                           pauseOnHover
                           bodyClassName="toast-body"
                        />
                     </AuthenticationProvider>
                  </>
               )}
            </MaterialThemeProvider>
         </BrowserRouter>
      </React.Suspense>
   );
}
