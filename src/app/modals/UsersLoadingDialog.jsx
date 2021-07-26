import React, { useMemo } from "react";
import { LoadingDialog } from "../../_metronic/_partials/controls";

import { useIntl } from "react-intl";

import { useUsersUIContext } from "../context/UsersUIContext";

import formatMessage from "../utils/formatMessage";

function UsersLoadingDialog() {
   const intl = useIntl();

   // Users UI Context
   const customersUIContext = useUsersUIContext();
   const customersUIProps = useMemo(() => {
      return {
         isLoading: customersUIContext.isLoading,
      };
   }, [customersUIContext]);

   return (
      <LoadingDialog
         isLoading={customersUIProps.isLoading}
         text={formatMessage(intl, "DEFAULT.LOADING")}
      />
   );
}

export default UsersLoadingDialog;
