/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React, { useContext } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Layout } from "../_metronic/layout";
import BasePage from "./BasePage";
import { Logout, AuthPage } from "./modules/Auth";
import routes from "./router/routes.json";

import { AuthenticationContext } from "./context/AuthenticationContext";

export function Routes() {
   const { isAuth } = useContext(AuthenticationContext);

   return (
      <Switch>
         {!isAuth ? (
            /*Render auth page when user at `/auth` and not authorized.*/
            <Route>
               <AuthPage />
            </Route>
         ) : (
            /*Otherwise redirect to root page (`/`)*/
            <Redirect from={routes.AUTH} to={routes.ROOT} />
         )}

         <Route path={routes.LOGOUT} component={Logout} />

         {!isAuth ? (
            /*Redirect to `/auth` when user is not authorized*/
            <Redirect to={routes.LOGIN} />
         ) : (
            <Layout>
               <BasePage />
            </Layout>
         )}
      </Switch>
   );
}
