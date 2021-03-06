/**
 * Create React App entry point. This and `public/index.html` files can not be
 * changed or moved.
 */
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";

import "./_metronic/_assets/plugins/keenthemes-icons/font/ki.css";
import "socicon/css/socicon.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./_metronic/_assets/plugins/flaticon/flaticon.css";
import "./_metronic/_assets/plugins/flaticon2/flaticon.css";
// Datepicker
import "react-datepicker/dist/react-datepicker.css";
import {
   MetronicLayoutProvider,
   MetronicSplashScreenProvider,
   MetronicSubheaderProvider,
} from "./_metronic/layout";

import "react-toastify/dist/ReactToastify.css";
import "./app/Assets/fonts/Vazir/fontVazir.css";

/**
 * Base URL of the website.
 *
 * @see https://facebook.github.io/create-react-app/docs/using-the-public-folder
 */
const { PUBLIC_URL } = process.env;

ReactDOM.render(
   <MetronicLayoutProvider>
      <MetronicSubheaderProvider>
         <MetronicSplashScreenProvider>
            <App basename={PUBLIC_URL} />
         </MetronicSplashScreenProvider>
      </MetronicSubheaderProvider>
   </MetronicLayoutProvider>,
   document.getElementById("root")
);
