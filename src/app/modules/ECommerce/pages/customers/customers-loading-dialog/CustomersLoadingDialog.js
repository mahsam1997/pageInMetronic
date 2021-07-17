import React, { useMemo } from "react";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

import { useIntl } from "react-intl";

import { useCustomersUIContext } from "../CustomersUIContext";

import formatMessage from "../../../../../utils/formatMessage";

export function CustomersLoadingDialog() {
   const intl = useIntl();

   // Customers UI Context
   const customersUIContext = useCustomersUIContext();
   const customersUIProps = useMemo(() => {
      return {
         isLoading: customersUIContext.isLoading,
      };
   }, [customersUIContext]);

   return (
      <LoadingDialog
         isLoading={customersUIProps.isLoading}
         text={formatMessage(intl, "ECOMMERCE.CUSTOMERS.LOADING")}
      />
   );
}
