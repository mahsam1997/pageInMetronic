import React, { Suspense, lazy } from "react";
import { Redirect, Switch } from "react-router-dom";
import { LayoutSplashScreen } from "../_metronic/layout";
import { DashboardPage } from "./pages/DashboardPage";

import ProtectedRoute from "./components/common/ProtectedRoute";

import routes from "./router/routes.json";

// const UsersPage = lazy(() => import("./modules/UserManagement/UserRoutes"));
const AddPageRoutes = lazy(() => import("./modules/Addpage/PageRouter"));

export default function BasePage() {
   return (
      <Suspense fallback={<LayoutSplashScreen />}>
         <Switch>
            {
               /* Redirect from root URL to /dashboard. */
               <Redirect exact from="/" to="/dashboard" />
            }
            <ProtectedRoute path="/dashboard" component={DashboardPage} />
            <ProtectedRoute path={routes.PAGES} component={AddPageRoutes} />
            {/* <ProtectedRoute path={routes.USERS} component={UsersPage} /> */}
         </Switch>
      </Suspense>
   );
}
