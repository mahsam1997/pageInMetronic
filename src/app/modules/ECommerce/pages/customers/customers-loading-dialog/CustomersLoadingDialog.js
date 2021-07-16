import React, { useMemo } from "react";
import { LoadingDialog } from "../../../../../../_metronic/_partials/controls";

import {useCustomersUIContext} from '../CustomersUIContext'

export function CustomersLoadingDialog() {

   // Customers UI Context
   const customersUIContext = useCustomersUIContext();
   const customersUIProps = useMemo(() => {
      return {
         isLoading: customersUIContext.isLoading,
      };
   }, [customersUIContext]);

   return <LoadingDialog isLoading={customersUIProps.isLoading} text="Loading ..." />;
}
