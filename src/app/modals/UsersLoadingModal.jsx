import React, { useMemo } from "react";
import { LoadingDialog } from "../../_metronic/_partials/controls";

import { useTranslation } from "react-i18next";
import { useUsersUIContext } from "../context/UsersUIContext";

function UsersLoadingModal() {
   const { t } = useTranslation();

   // Users UI Context
   const usersUIContext = useUsersUIContext();
   const usersUIProps = useMemo(() => {
      return {
         isLoading: usersUIContext.isModalLoading,
      };
   }, [usersUIContext]);

   return (
      <LoadingDialog
         isLoading={usersUIProps.isLoading}
         text={t("messages.DEFAULT.LOADING")}
      />
   );
}

export default UsersLoadingModal;
