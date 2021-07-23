import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthenticationContext } from "../../context/AuthenticationContext";

import routes from "../../router/routes";

const ProtectedRoute = ({ component: Component, ...props }) => {
   const { isAuth } = useContext(AuthenticationContext);

   return isAuth ? (
      <Route {...props} render={routeProps => <Component {...routeProps} />} />
   ) : (
      <Redirect to={routes.AUTH} />
   );
};

export default ProtectedRoute;
