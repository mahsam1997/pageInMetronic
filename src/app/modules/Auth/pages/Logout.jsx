import React, { useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { LayoutSplashScreen } from "../../../../_metronic/layout";

import { clearAuthenticate } from "../../../utils/authenticate";
import { AuthenticationContext } from "../../../context/AuthenticationContext";

const Logout = () => {
   const { isAuth, setIsAuth } = useContext(AuthenticationContext);

   useEffect(() => {
      clearAuthenticate();
      setIsAuth(false);
   }, [setIsAuth]);

   return isAuth ? <LayoutSplashScreen /> : <Redirect to="/auth/login" />;
};

export default Logout;
