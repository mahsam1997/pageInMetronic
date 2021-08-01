import React, { useMemo } from "react";
import {
   Card,
   CardBody,
   CardHeader,
   //CardHeaderToolbar,
} from "../../_metronic/_partials/controls";
import UsersFilter from "../components/UsersFilter";
import { UsersTable } from "./UsersTable";
import UsersGrouping from "./UsersGrouping";
import { useUsersUIContext } from "../context/UsersUIContext";

import { useTranslation } from "react-i18next";

function UsersCard() {
   const usersUIContext = useUsersUIContext();
   const { t } = useTranslation();
   const usersUIProps = useMemo(() => {
      return {
         ids: usersUIContext.ids,
      };
   }, [usersUIContext]);

   return (
      <Card>
         <CardHeader title={t("messages.USERS.USERS_LIST")}></CardHeader>
         <CardBody>
            <UsersFilter />
            {usersUIProps.ids.length > 0 && <UsersGrouping />}
            <UsersTable />
         </CardBody>
      </Card>
   );
}

export default UsersCard;
