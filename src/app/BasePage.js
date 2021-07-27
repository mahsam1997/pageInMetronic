import React, { Suspense, lazy } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen } from "../_metronic/layout";
import { DashboardPage } from "./pages/DashboardPage";

import ProtectedRoute from "./components/common/ProtectedRoute";

import routes from "./router/routes.json";

// const ECommercePage = lazy(() =>
//    import("./modules/ECommerce/pages/eCommercePage")
// );

const UsersPage = lazy(() => import("./modules/UserManagement/UserRoutes"));

export default function BasePage() {
   // useEffect(() => {
   //   console.log('Base page');
   // }, []) // [] - is required if you need only one call
   // https://reactjs.org/docs/hooks-reference.html#useeffect

   return (
      <Suspense fallback={<LayoutSplashScreen />}>
         <Switch>
            {
               /* Redirect from root URL to /dashboard. */
               <Redirect exact from="/" to="/dashboard" />
            }
            <ProtectedRoute path="/dashboard" component={DashboardPage} />
            {/* <ProtectedRoute path="/e-commerce" component={ECommercePage} /> */}
            <ProtectedRoute path={routes.USERS} component={UsersPage} />
         </Switch>
      </Suspense>
   );
}
