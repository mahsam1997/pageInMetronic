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
   // sortCaret,
   // headerSortingClasses,
} from "../../../../../../_metronic/_helpers";
import * as uiHelpers from "../CustomersUIHelpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../_metronic/_partials/controls";
import { useCustomersUIContext } from "../CustomersUIContext";

import useFormatMessage from "../../../../../hooks/useFormatMessage";

import { getUsers } from "../../../../../services/users.service";

export function CustomersTable() {
   const [entities, setEntities] = useState({
      customers: [],
      total: 0,
   });
   const [loading, setLoading] = useState(false);

   // Customers UI Context
   const customersUIContext = useCustomersUIContext();
   const customersUIProps = useMemo(() => {
      return {
         ids: customersUIContext.ids,
         setIds: customersUIContext.setIds,
         queryParams: customersUIContext.queryParams,
         setQueryParams: customersUIContext.setQueryParams,
         openEditCustomerDialog: customersUIContext.openEditCustomerDialog,
         openDeleteCustomerDialog: customersUIContext.openDeleteCustomerDialog,
      };
   }, [customersUIContext]);

   // Table columns
   const columns = [
      {
         dataField: "profile.fullName",
         text: useFormatMessage("AUTH.INPUT.FULLNAME"),
         // sort: true,
         // sortCaret: sortCaret,
         // headerSortingClasses,
      },
      {
         dataField: "email",
         text: useFormatMessage("AUTH.INPUT.EMAIL"),
      },
      {
         dataField: "mobile",
         text: useFormatMessage("ECOMMERCE.COMMON.MOBILE"),
      },
      {
         dataField: "role",
         text: useFormatMessage("ECOMMERCE.CUSTOMERS.ROLE"),
      },
      {
         dataField: "status",
         text: useFormatMessage("ECOMMERCE.CUSTOMERS.STATUS"),
      },
      {
         dataField: "action",
         text: useFormatMessage("ECOMMERCE.CUSTOMERS.ACTIONS"),
         formatter: columnFormatters.ActionsColumnFormatter,
         formatExtraData: {
            openEditCustomerDialog: customersUIProps.openEditCustomerDialog,
            openDeleteCustomerDialog: customersUIProps.openDeleteCustomerDialog,
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
      sizePerPage: customersUIProps.queryParams.pageSize,
      page: customersUIProps.queryParams.pageNumber,
   };

   useLayoutEffect(() => {
      setEntities(prevCustomers => ({
         customers: [],
         total: prevCustomers.total,
      }));
   }, [customersUIProps.queryParams]);

   useEffect(() => {
      const getCustomers = async () => {
         setLoading(true);
         const users = await getUsers(
            customersUIProps.queryParams.pageSize,
            customersUIProps.queryParams.pageNumber,
            customersUIProps.queryParams.filter
         );
         if (users?.data?.success) {
            setEntities({
               customers: users.data.data,
               total: users.data.total,
            });
         }
         setLoading(false);
      };
      getCustomers();
   }, [customersUIProps]);

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
                        data={
                           entities.customers === null ? [] : entities.customers
                        }
                        columns={columns}
                        defaultSorted={uiHelpers.defaultSorted}
                        onTableChange={getHandlerTableChange(
                           customersUIProps.setQueryParams
                        )}
                        selectRow={getSelectRow({
                           entities: entities.customers,
                           ids: customersUIProps.ids,
                           setIds: customersUIProps.setIds,
                        })}
                        {...paginationTableProps}
                     >
                        <PleaseWaitMessage entities={entities.customers} />
                        <NoRecordsFoundMessage entities={entities.customers} />
                     </BootstrapTable>
                  </Pagination>
               );
            }}
         </PaginationProvider>
      </>
   );
}
