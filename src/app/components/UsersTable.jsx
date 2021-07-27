// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
import React, { useEffect, useMemo, useState, useLayoutEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
   PaginationProvider,
} from "react-bootstrap-table2-paginator";
import {
   getSelectRow,
   getHandlerTableChange,
   NoRecordsFoundMessage,
   PleaseWaitMessage,
   sortCaret,
   headerSortingClasses,
} from "../../_metronic/_helpers";
import * as uiHelpers from "../enums/usersUIHelpers";
import ActionsColumnFormatter from "./ActionsColumnFormatter";
import { Pagination } from "../../_metronic/_partials/controls";
import { useUsersUIContext } from "../context/UsersUIContext";

import toFarsiNumber from "../utils/toFarsiNumber";
import { getUsers } from "../services/users.service";
import { useTranslation } from "react-i18next";
import { useSubheader } from "../../_metronic/layout";

export function UsersTable() {
   const [entities, setEntities] = useState({
      users: [],
      total: 0,
   });
   const [loading, setLoading] = useState(false);

   const { t, i18n } = useTranslation();

   console.log("direction: ", i18n.dir());

   const isLtrDir = i18n.dir() === "ltr";

   const subHeader = useSubheader();
   subHeader.setTitle(t("messages.USERS.USERS"));

   // Users UI Context
   const usersUIContext = useUsersUIContext();
   const usersUIProps = useMemo(() => {
      return {
         ids: usersUIContext.ids,
         setIds: usersUIContext.setIds,
         queryParams: usersUIContext.queryParams,
         setQueryParams: usersUIContext.setQueryParams,
         openEditUserDialog: usersUIContext.openEditUserDialog,
         openDeleteUserDialog: usersUIContext.openDeleteUserDialog,
      };
   }, [usersUIContext]);

   // Table columns
   const columns = [
      {
         dataField: "profile.fullName",
         text: t("messages.AUTH.INPUT.FULLNAME"),
         headerAlign: "center",
         align: "center",
         sort: true,
         sortCaret: sortCaret,
         headerSortingClasses,
      },
      {
         dataField: "email",
         text: t("messages.AUTH.INPUT.EMAIL"),
         formatter: (cell, row, rowIndex) =>
            isLtrDir ? cell : toFarsiNumber(cell),
         headerAlign: "center",
         align: "center",
         sort: true,
         sortCaret: sortCaret,
         headerSortingClasses,
      },
      {
         dataField: "mobile",
         text: t("messages.DEFAULT.MOBILE"),
         formatter: (cell, row, rowIndex) =>
            isLtrDir ? cell : toFarsiNumber(cell),
         headerAlign: "center",
         align: "center",
         sort: true,
         sortCaret: sortCaret,
         headerSortingClasses,
         style: {
            direction: "ltr",
         },
      },
      {
         dataField: "role",
         text: t("messages.USERS.ROLE"),
         headerAlign: "center",
         align: "center",
         sort: true,
         sortCaret: sortCaret,
         headerSortingClasses,
      },
      {
         dataField: "status",
         text: t("messages.USERS.STATUS"),
         headerAlign: "center",
         align: "center",
         sort: true,
         sortCaret: sortCaret,
         headerSortingClasses,
      },
      {
         dataField: "action",
         text: t("messages.USERS.ACTIONS"),
         formatter: ActionsColumnFormatter,
         formatExtraData: {
            openEditUserDialog: usersUIProps.openEditUserDialog,
            openDeleteUserDialog: usersUIProps.openDeleteUserDialog,
         },
         classes: "text-right pr-0",
         headerClasses: "text-right pr-3",
         style: {
            minWidth: "100px",
         },
      },
   ];
   // Table pagination properties
   const paginationOptions = {
      custom: true,
      totalSize: entities.total,
      sizePerPageList: uiHelpers.sizePerPageList,
      sizePerPage: usersUIProps.queryParams.pageSize,
      page: usersUIProps.queryParams.pageNumber,
   };

   useLayoutEffect(() => {
      setEntities(prevUsers => ({
         users: [],
         total: prevUsers.total,
      }));
   }, [usersUIProps.queryParams]);

   useEffect(() => {
      const getUsersFn = async () => {
         setLoading(true);
         const users = await getUsers(
            usersUIProps.queryParams.pageSize,
            usersUIProps.queryParams.pageNumber,
            usersUIProps.queryParams.filter,
            usersUIProps.queryParams.sortOrder,
            usersUIProps.queryParams.sortField
         );
         if (users?.data?.success) {
            setEntities({
               users: users.data.data,
               total: users.data.total,
            });
         }
         setLoading(false);
      };
      getUsersFn();
   }, [usersUIProps]);

   return (
      <>
         <PaginationProvider pagination={paginationFactory(paginationOptions)}>
            {({ paginationProps, paginationTableProps }) => {
               return (
                  <Pagination
                     isLoading={loading}
                     paginationProps={paginationProps}
                  >
                     <BootstrapTable
                        wrapperClasses="table-responsive"
                        bordered={false}
                        classes="table table-head-custom table-vertical-center overflow-hidden"
                        bootstrap4
                        remote
                        keyField="_id"
                        data={entities.users}
                        columns={columns}
                        defaultSorted={uiHelpers.defaultSorted}
                        onTableChange={getHandlerTableChange(
                           usersUIProps.setQueryParams
                        )}
                        selectRow={getSelectRow({
                           entities: entities.users,
                           ids: usersUIProps.ids,
                           setIds: usersUIProps.setIds,
                        })}
                        {...paginationTableProps}
                     >
                        <PleaseWaitMessage entities={entities.users} />
                        <NoRecordsFoundMessage entities={entities.users} />
                     </BootstrapTable>
                  </Pagination>
               );
            }}
         </PaginationProvider>
      </>
   );
}
