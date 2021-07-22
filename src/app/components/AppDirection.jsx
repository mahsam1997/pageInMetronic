import React from "react";
import { useTranslation } from "react-i18next";

const RtlStyles = React.lazy(() => import("./RtlStyles"));
const LtrStyles = React.lazy(() => import("./LtrStyles"));

const AppDirection = () => {
   const { i18n } = useTranslation();

   const appDirection = i18n.dir();

   document.body.direction = appDirection;
   document.body.dir = appDirection;
   document.body.style.direction = appDirection;

   return (
      <>
         {appDirection === "ltr" && <LtrStyles />}
         {appDirection === "rtl" && <RtlStyles />}
      </>
   );
};

export default AppDirection;
