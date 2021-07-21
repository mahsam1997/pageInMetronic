import React from "react";
import i18next from "i18next";

const RtlStyles = React.lazy(() => import("./RtlStyles"));
const LtrStyles = React.lazy(() => import("./LtrStyles"));

const language =
   JSON.parse(localStorage.getItem("i18nConfig"))?.selectedLang || "en";
const body = document.getElementById("kt_body");

const isEnglish = language === "en";
body.direction = isEnglish ? "ltr" : "rtl";
body.dir = isEnglish ? "ltr" : "rtl";
body.style.direction = isEnglish ? "ltr" : "rtl";

// const appDirection = i18next.dir();
// body.direction = appDirection;
// body.dir = appDirection;
// body.style.direction = appDirection;

const AppDirection = () => {
   console.log("App direction: ", i18next.dir());

   return isEnglish ? <LtrStyles /> : <RtlStyles />;

   //    return appDirection === "ltr" ? <LtrStyles /> : <RtlStyles />;
};

export default AppDirection;
