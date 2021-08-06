import React, { useMemo } from "react";
import {
   Card,
   CardBody,
   CardHeader,
   //CardHeaderToolbar,
} from "../../../_metronic/_partials/controls";
import PagesFilter from "./pagesFilter";
import { PagesTable } from "./pagesTable";
import PagesGrouping from "./pagesGrouping";
import { usePageListUIContext } from "../context/pageListUiContex";

import { useTranslation } from "react-i18next";

function PagesCard() {
   const pageListUIContext = usePageListUIContext();
   const { t } = useTranslation();
   const pagesUIProps = useMemo(() => {
      return {
         ids: pageListUIContext.ids,
      };
   }, [pageListUIContext]);

   return (
      <Card>
         <CardHeader title={t("messages.USERS.USERS_LIST")}></CardHeader>
         <CardBody>
            <PagesFilter />
            {pagesUIProps.ids.length > 0 && <PagesGrouping />}
            <PagesTable />
         </CardBody>
      </Card>
   );
}

export default PagesCard;
