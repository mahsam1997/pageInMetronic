import React, { useMemo } from "react";
import { LoadingDialog } from "../../_metronic/_partials/controls";

import { useTranslation } from "react-i18next";
import { useUsersUIContext } from "../context/UsersUIContext";

function UsersLoadingModal() {
   const { t } = useTranslation();

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
         text={t("messages.DEFAULT.LOADING")}
      />
   );
}

export default UsersLoadingModal;
