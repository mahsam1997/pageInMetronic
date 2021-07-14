import React from "react";
import { Route, Redirect } from "react-router-dom";

import isAuthorized from "../utils/isAuthorized";
import routes from "../router/routes";

const ProtectedRoute = ({ component: Component, ...props }) =>
   isAuthorized() ? (
      <Route {...props} render={routeProps => <Component {...routeProps} />} />
   ) : (
      <Redirect to={routes.AUTH} />
   );

export default ProtectedRoute;
