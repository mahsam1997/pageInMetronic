import React, { useMemo } from "react";
import { LoadingDialog } from "../../../_metronic/_partials/controls";

import { useTranslation } from "react-i18next";
import {usePageListUIContext } from "../context/pageListUiContex";

function PageLoadingModal() {
   const { t } = useTranslation();

   // page UI Context
   const pageListUIContext = usePageListUIContext();
   const pagesUIProps = useMemo(() => {
      return {
         isLoading: pageListUIContext.isModalLoading,
      };
   }, [pageListUIContext]);

   return (
      <LoadingDialog
         isLoading={pagesUIProps.isLoading}
         text={t("messages.DEFAULT.LOADING")}
      />
   );
}

export default PageLoadingModal;
