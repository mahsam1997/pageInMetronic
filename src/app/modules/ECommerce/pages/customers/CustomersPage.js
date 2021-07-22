import React from "react";
import { Route } from "react-router-dom";
import { CustomersLoadingDialog } from "./customers-loading-dialog/CustomersLoadingDialog";
import { CustomerEditDialog } from "./customer-edit-dialog/CustomerEditDialog";
import { CustomerDeleteDialog } from "./customer-delete-dialog/CustomerDeleteDialog";
import { CustomersDeleteDialog } from "./customers-delete-dialog/CustomersDeleteDialog";
import { CustomersFetchDialog } from "./customers-fetch-dialog/CustomersFetchDialog";
import { CustomersUpdateStateDialog } from "./customers-update-status-dialog/CustomersUpdateStateDialog";
import { CustomersUIProvider } from "./CustomersUIContext";
import { CustomersCard } from "./CustomersCard";

import routes from "../../../../router/routes.json";

export function CustomersPage({ history }) {
   const customersUIEvents = {
      newCustomerButtonClick: () => {
         history.push(routes.ECOMMERCE_CUSTOMERS_NEW);
      },
      openEditCustomerDialog: id => {
         history.push(`${routes.ECOMMERCE_CUSTOMERS}/${id}/edit`);
      },
      openDeleteCustomerDialog: id => {
         history.push(`${routes.ECOMMERCE_CUSTOMERS}/${id}/delete`);
      },
      openDeleteCustomersDialog: () => {
         history.push(routes.ECOMMERCE_CUSTOMERS_DELETE_CUSTOMERS);
      },
      openFetchCustomersDialog: () => {
         history.push(routes.ECOMMERCE_CUSTOMERS_FETCH);
      },
      openUpdateCustomersStatusDialog: () => {
         history.push(routes.ECOMMERCE_CUSTOMERS_UPDATE_STATUS);
      },
   };

   return (
      <CustomersUIProvider customersUIEvents={customersUIEvents}>
         <CustomersLoadingDialog />
         <Route path={routes.ECOMMERCE_CUSTOMERS_NEW}>
            {({ match }) => (
               <CustomerEditDialog
                  show={match != null}
                  onHide={() => {
                     history.push(routes.ECOMMERCE_CUSTOMERS);
                  }}
               />
            )}
         </Route>
         <Route path={routes.ECOMMERCE_CUSTOMERS_EDIT}>
            {({ match }) => (
               <CustomerEditDialog
                  show={match != null}
                  id={match && match.params.id}
                  onHide={() => {
                     history.push(routes.ECOMMERCE_CUSTOMERS);
                  }}
               />
            )}
         </Route>
         <Route path={routes.ECOMMERCE_CUSTOMERS_DELETE_CUSTOMERS}>
            {({ match }) => (
               <CustomersDeleteDialog
                  show={match != null}
                  onHide={() => {
                     history.push(routes.ECOMMERCE_CUSTOMERS);
                  }}
               />
            )}
         </Route>
         <Route path={routes.ECOMMERCE_CUSTOMERS_DELETE}>
            {({ match }) => (
               <CustomerDeleteDialog
                  show={match != null}
                  id={match && match.params.id}
                  onHide={() => {
                     history.push(routes.ECOMMERCE_CUSTOMERS);
                  }}
               />
            )}
         </Route>
         <Route path={routes.ECOMMERCE_CUSTOMERS_FETCH}>
            {({ match }) => (
               <CustomersFetchDialog
                  show={match != null}
                  onHide={() => {
                     history.push(routes.ECOMMERCE_CUSTOMERS);
                  }}
               />
            )}
         </Route>
         <Route path={routes.ECOMMERCE_CUSTOMERS_UPDATE_STATUS}>
            {({ match }) => (
               <CustomersUpdateStateDialog
                  show={match != null}
                  onHide={() => {
                     history.push(routes.ECOMMERCE_CUSTOMERS);
                  }}
               />
            )}
         </Route>
         <CustomersCard />
      </CustomersUIProvider>
   );
}
