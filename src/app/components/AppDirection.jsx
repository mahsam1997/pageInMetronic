import React, { useEffect, useState } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

const RtlStyles = React.lazy(() => import("./RtlStyles"));
const LtrStyles = React.lazy(() => import("./LtrStyles"));

const AppDirection = () => {
   const [appDirection, setAppDirection] = useState();
   const { i18n } = useTranslation();

   useEffect(() => {
      console.log("in useEffect: ", i18n);
      if (i18n.isInitialized) {
         const direction = i18next.dir();

         document.body.direction = direction;
         document.body.dir = direction;
         document.body.style.direction = direction;
         setAppDirection(direction);
      }
   }, [i18n]);

   return appDirection === "ltr" ? <LtrStyles /> : <RtlStyles />;
};

export default AppDirection;
