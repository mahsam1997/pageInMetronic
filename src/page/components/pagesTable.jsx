// // React bootstrap table next =>
// // DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// // STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
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
import * as uiHelpers from "../enums/pagesUIHelpers";
import ActionsColumnFormatter from "./ActionsColumnFormatter";
import { Pagination } from "../../_metronic/_partials/controls";
import { usePageListUIContext } from "../context/pageListUiContex";

// import toFarsiNumber from "../utils/toFarsiNumber";
import { getPages } from "../services/pages.service";
import { useTranslation } from "react-i18next";
import { useSubheader } from "../../_metronic/layout";

export function PagesTable() {
   const [entities, setEntities] = useState({
      pages: [],
      total: 0,
   });
   const [loading, setLoading] = useState(false);

   const { t, i18n } = useTranslation();

   const isLtrDir = i18n.dir() === "ltr";

   const subHeader = useSubheader();
   // subHeader.setTitle(t("messages.USERS.USERS"));
   subHeader.setTitle("صفحات");
   // Users UI Context
   const pageListUIContext = usePageListUIContext();
   const pagesUIProps = useMemo(() => {
      return {
         ids: pageListUIContext.ids,
         setIds: pageListUIContext.setIds,
         queryParams: pageListUIContext.queryParams,
         setQueryParams: pageListUIContext.setQueryParams,
         openEditPage: pageListUIContext.openEditPage,
         openDeletePageModal: pageListUIContext.openDeletePageModal,
         isModalClose: pageListUIContext.isModalClose,
         setIsModalLoading: pageListUIContext.setIsModalLoading,
      };
   }, [pageListUIContext]);

   // Table columns
   const columns = [
      {
         dataField: "title",
         // text: t("messages.AUTH.INPUT.FULLNAME"),
         text: "عنوان",
         headerAlign: "center",
         align: "center",
         sort: true,
         sortCaret: sortCaret,
         headerSortingClasses,
      },
      {
         dataField: "key",
         // text: t("messages.AUTH.INPUT.EMAIL"),
         text: "کلید",
         // formatter: (cell, row, rowIndex) =>
         //    isLtrDir ? cell : null,
         headerAlign: "center",
         align: "center",
         // sort: true,
         sortCaret: sortCaret,
         headerSortingClasses,
      },
      {
         dataField: "language",
         // text: t("messages.DEFAULT.MOBILE"),
         text: "زبان",
         // formatter: (cell, row, rowIndex) =>
         //    isLtrDir ? cell : null,
         headerAlign: "center",
         align: "center",
         // sort: true,
         sortCaret: sortCaret,
         headerSortingClasses,
      },
      // {
      //    dataField: "content",
      //    // text: t("messages.USERS.ROLE"),
      //    text: "محتوا",
      //    headerAlign: "center",
      //    align: "right",
      //    sort: true,
      //    sortCaret: sortCaret,
      //    headerSortingClasses,
      // },
      {
         dataField: "status",
         // text: t("messages.USERS.STATUS"),
         text: "وضعیت",
         headerAlign: "center",
         align: "center",
         // sort: true,
         sortCaret: sortCaret,
         headerSortingClasses,
      },
      {
         dataField: "action",
         text: t("messages.USERS.ACTIONS"),
         formatter: (...args) =>
            ActionsColumnFormatter(entities.pages, ...args),
         formatExtraData: {
            openEditPage:pagesUIProps.openEditPage,
            openDeletePageModal: pagesUIProps.openDeletePageModal,
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
      sizePerPage: pagesUIProps.queryParams.pageSize,
      page: pagesUIProps.queryParams.pageNumber,
   };

   useLayoutEffect(() => {
      setEntities(prevUsers => ({
         pages: [],
         total: prevUsers.total,
      }));
   }, [pagesUIProps.queryParams]);

   useEffect(() => {
      const getPagesFn = async () => {
         setLoading(true);
         pagesUIProps.setIsModalLoading(true);
         const pages = await getPages(
            pagesUIProps.queryParams.pageSize,
            pagesUIProps.queryParams.pageNumber,
            pagesUIProps.queryParams.filter,
            pagesUIProps.queryParams.sortOrder,
            pagesUIProps.queryParams.sortField
         );
         if (pages?.data?.success) {
            setEntities({
               pages: pages.data.data,
               total: pages.data.total,
            });
         }
         setLoading(false);
         pagesUIProps.setIsModalLoading(false);
      };
      getPagesFn();

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [pagesUIProps.queryParams, pagesUIProps.isModalClose]);

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
                        data={entities.pages}
                        columns={columns}
                        defaultSorted={uiHelpers.defaultSorted}
                        onTableChange={getHandlerTableChange(
                           pagesUIProps.setQueryParams
                        )}
                        selectRow={getSelectRow({
                           entities: entities.pages,
                           ids: pagesUIProps.ids,
                           setIds: pagesUIProps.setIds,
                        })}
                        {...paginationTableProps}
                     >
                        <PleaseWaitMessage entities={entities.pages} />
                        <NoRecordsFoundMessage entities={entities.pages} />
                     </BootstrapTable>
                  </Pagination>
               );
            }}
         </PaginationProvider>
      </>
   );
}
// React bootstrap table next =>
// DOCS: https://react-bootstrap-table.github.io/react-bootstrap-table2/docs/
// STORYBOOK: https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html
// import React, { useEffect, useMemo, useState, useLayoutEffect } from "react";
// import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory, {
//    PaginationProvider,
// } from "react-bootstrap-table2-paginator";
// import {
//    getSelectRow,
//    getHandlerTableChange,
//    NoRecordsFoundMessage,
//    PleaseWaitMessage,
//    sortCaret,
//    headerSortingClasses,
// } from "../../_metronic/_helpers";
// import * as uiHelpers from "../enums/pagesUIHelpers";
// import ActionsColumnFormatter from "./ActionsColumnFormatter";
// import { Pagination } from "../../_metronic/_partials/controls";
// import { usePageListUIContext } from "../context/pageListUiContex";

// import toFarsiNumber from "../utils/toFarsiNumber";
// import { getPages } from "../services/pages.service";
// import { useTranslation } from "react-i18next";
// import { useSubheader } from "../../_metronic/layout";
// export function PagesTable() {
//    const [entities, setEntities] = useState({
//       users: [],
//       total: 0,
//    });
//    const [loading, setLoading] = useState(false);

//    const { t, i18n } = useTranslation();

//    const isLtrDir = i18n.dir() === "ltr";

//    const subHeader = useSubheader();
//    subHeader.setTitle(t("messages.USERS.USERS"));

//    // Users UI Context
//    const pageListUIContext =usePageListUIContext();
//    const pagesUIProps = useMemo(() => {
//       return {
//          ids: pageListUIContext.ids,
//          setIds: pageListUIContext.setIds,
//          queryParams: pageListUIContext.queryParams,
//          setQueryParams: pageListUIContext.setQueryParams,
//          openEditUserModal: pageListUIContext.openEditUserModal,
//          openDeleteUserModal: pageListUIContext.openDeleteUserModal,
//          isModalClose: pageListUIContext.isModalClose,
//          setIsModalLoading: pageListUIContext.setIsModalLoading,
//       };
//    }, [pageListUIContext]);

//    // Table columns
//    const columns = [
//       {
//          dataField: "profile.fullName",
//          text: t("messages.AUTH.INPUT.FULLNAME"),
//          headerAlign: "center",
//          align: "center",
//          sort: true,
//          sortCaret: sortCaret,
//          headerSortingClasses,
//       },
//       {
//          dataField: "email",
//          text: t("messages.AUTH.INPUT.EMAIL"),
//          formatter: (cell, row, rowIndex) =>
//             isLtrDir ? cell : null,
//          headerAlign: "center",
//          align: "center",
//          sort: true,
//          sortCaret: sortCaret,
//          headerSortingClasses,
//       },
//       {
//          dataField: "mobile",
//          text: t("messages.DEFAULT.MOBILE"),
//          formatter: (cell, row, rowIndex) =>
//             isLtrDir ? cell : null,
//          headerAlign: "center",
//          align: "center",
//          sort: true,
//          sortCaret: sortCaret,
//          headerSortingClasses,
//       },
//       {
//          dataField: "role",
//          text: t("messages.USERS.ROLE"),
//          headerAlign: "center",
//          align: "center",
//          sort: true,
//          sortCaret: sortCaret,
//          headerSortingClasses,
//       },
//       {
//          dataField: "status",
//          text: t("messages.USERS.STATUS"),
//          headerAlign: "center",
//          align: "center",
//          sort: true,
//          sortCaret: sortCaret,
//          headerSortingClasses,
//       },
//       {
//          dataField: "action",
//          text: t("messages.USERS.ACTIONS"),
//          formatter: (...args) =>
//             ActionsColumnFormatter(entities.users, ...args),
//          formatExtraData: {
//             openEditPageModal: pagesUIProps.openEditPageModal,
//             openDeletePageModal: pagesUIProps.openDeletePageModal,
//          },
//          classes: "text-right pr-0",
//          headerClasses: "text-right pr-3",
//          style: {
//             minWidth: "100px",
//          },
//       },
//    ];
//    // Table pagination properties
//    const paginationOptions = {
//       custom: true,
//       totalSize: entities.total,
//       sizePerPageList: uiHelpers.sizePerPageList,
//       sizePerPage: pagesUIProps.queryParams.pageSize,
//       page: pagesUIProps.queryParams.pageNumber,
//    };

//    useLayoutEffect(() => {
//       setEntities(prevUsers => ({
//          users: [],
//          total: prevUsers.total,
//       }));
//    }, [pagesUIProps.queryParams]);

//    useEffect(() => {
//       const getUsersFn = async () => {
//          setLoading(true);
//          pagesUIProps.setIsModalLoading(true);
//          const users = await getPages(
//             pagesUIProps.queryParams.pageSize,
//             pagesUIProps.queryParams.pageNumber,
//             pagesUIProps.queryParams.filter,
//             pagesUIProps.queryParams.sortOrder,
//             pagesUIProps.queryParams.sortField
//          );
//          if (users?.data?.success) {
//             setEntities({
//                users: users.data.data,
//                total: users.data.total,
//             });
//          }
//          setLoading(false);
//          pagesUIProps.setIsModalLoading(false);
//       };
//       getUsersFn();

//       // eslint-disable-next-line react-hooks/exhaustive-deps
//    }, [pagesUIProps.queryParams, pagesUIProps.isModalClose]);

//    return (
//       <>
//          <PaginationProvider pagination={paginationFactory(paginationOptions)}>
//             {({ paginationProps, paginationTableProps }) => {
//                return (
//                   <Pagination
//                      isLoading={loading}
//                      paginationProps={paginationProps}
//                   >
//                      <BootstrapTable
//                         wrapperClasses="table-responsive"
//                         bordered={false}
//                         classes="table table-head-custom table-vertical-center overflow-hidden"
//                         bootstrap4
//                         remote
//                         keyField="_id"
//                         data={entities.users}
//                         columns={columns}
//                         defaultSorted={uiHelpers.defaultSorted}
//                         onTableChange={getHandlerTableChange(
//                            pagesUIProps.setQueryParams
//                         )}
//                         selectRow={getSelectRow({
//                            entities: entities.users,
//                            ids: pagesUIProps.ids,
//                            setIds: pagesUIProps.setIds,
//                         })}
//                         {...paginationTableProps}
//                      >
//                         <PleaseWaitMessage entities={entities.users} />
//                         <NoRecordsFoundMessage entities={entities.users} />
//                      </BootstrapTable>
//                   </Pagination>
//                );
//             }}
//          </PaginationProvider>
//       </>
//    );
// }
