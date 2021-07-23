import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { CustomersPage } from "./customers/CustomersPage";
// import { ProductsPage } from "./products/ProductsPage";
// import { ProductEdit } from "./products/product-edit/ProductEdit";
import { LayoutSplashScreen } from "../../../../_metronic/layout";

import ProtectedRoute from "../../../components/common/ProtectedRoute";

import routes from "../../../router/routes.json";

export default function eCommercePage() {
   return (
      <Suspense fallback={<LayoutSplashScreen />}>
         <Switch>
            {
               /* Redirect from eCommerce root URL to /customers */
               <Redirect
                  exact={true}
                  from={routes.ECOMMERCE}
                  to={routes.ECOMMERCE_CUSTOMERS}
               />
            }
            <ProtectedRoute
               path={routes.ECOMMERCE_CUSTOMERS}
               component={CustomersPage}
            />
            {/* <ContentRoute path="/e-commerce/products/new" component={ProductEdit} /> */}
            {/* <ContentRoute
          path="/e-commerce/products/:id/edit"
          component={ProductEdit}
        /> */}

            {/* <ContentRoute path="/e-commerce/products" component={ProductsPage} /> */}
         </Switch>
      </Suspense>
   );
}
