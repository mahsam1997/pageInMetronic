import React from "react";
import { useLang } from "./Metronici18n";
import { IntlProvider } from "react-intl";
import "@formatjs/intl-relativetimeformat/polyfill";
import "@formatjs/intl-relativetimeformat/dist/locale-data/en";
import "@formatjs/intl-relativetimeformat/dist/locale-data/fa";

import enMessages from "./messages/en";
import faMessages from "./messages/fa";

import enErrors from "./errors/en-errors";
import faErrors from "./errors/fa-errors";

import enNouns from "./nouns/en-nouns";
import faNouns from "./nouns/fa-nouns";

const allEnMessages = {
   ...enMessages,
   ...enErrors,
   ...enNouns,
};
const allFaMessages = {
   ...faMessages,
   ...faErrors,
   ...faNouns,
};

const allMessages = {
   en: allEnMessages,
   fa: allFaMessages,
};

export function I18nProvider({ children }) {
   const locale = useLang();
   const messages = allMessages[locale];

   return (
      <IntlProvider locale={locale} messages={messages}>
         {children}
      </IntlProvider>
   );
}
