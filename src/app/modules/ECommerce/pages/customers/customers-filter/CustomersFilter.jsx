import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useCustomersUIContext } from "../CustomersUIContext";

import { FormattedMessage, useIntl } from "react-intl";

import formatMessage from "../../../../../utils/formatMessage";

const prepareFilter = (queryParams, values) => {
   const { status, roll, searchText, searchBy } = values;
   const newQueryParams = { ...queryParams };
   const filter = {};
   // Filter by status
   filter.status = status;
   // Filter by roll
   filter.roll = roll;

   // Filter by all fields
   if (searchText) {
      filter.searchKey = searchBy;
      filter[searchBy] = searchText;
   }
   newQueryParams.filter = filter;
   return newQueryParams;
};

const fieldsIds = {
   fullName: "AUTH.INPUT.FULLNAME",
   mobile: "ECOMMERCE.COMMON.MOBILE",
   email: "ECOMMERCE.COMMON.EMAIL",
};

export function CustomersFilter({ listLoading }) {
   const intl = useIntl();

   // Customers UI Context
   const customersUIContext = useCustomersUIContext();
   const customersUIProps = useMemo(() => {
      return {
         queryParams: customersUIContext.queryParams,
         setQueryParams: customersUIContext.setQueryParams,
      };
   }, [customersUIContext]);

   // queryParams, setQueryParams,
   const applyFilter = values => {
      const newQueryParams = prepareFilter(
         customersUIProps.queryParams,
         values
      );
      if (!isEqual(newQueryParams, customersUIProps.queryParams)) {
         newQueryParams.pageNumber = 1;
         // update list by queryParams
         customersUIProps.setQueryParams(newQueryParams);
      }
   };

   return (
      <>
         <Formik
            initialValues={{
               status: "",
               roll: "",
               searchText: "",
               searchBy: "fullName",
            }}
            onSubmit={values => {
               applyFilter(values);
            }}
         >
            {({
               values,
               handleSubmit,
               handleBlur,
               handleChange,
               setFieldValue,
            }) => (
               <form onSubmit={handleSubmit} className="form form-label-right">
                  <div className="form-group row">
                     <div className="col-lg-2">
                        <select
                           className="form-control"
                           name="status"
                           // placeholder="Filter by Status"
                           // TODO: Change this code
                           onChange={e => {
                              setFieldValue("status", e.target.value);
                              handleSubmit();
                           }}
                           onBlur={handleBlur}
                           value={values.status}
                        >
                           <option value="">
                              {formatMessage(intl, "ECOMMERCE.COMMON.ALL")}
                           </option>

                           <option value="active">
                              {formatMessage(intl, "ECOMMERCE.COMMON.ACTIVE")}
                           </option>

                           <option value="removed">
                              {formatMessage(intl, "ECOMMERCE.COMMON.REMOVED")}
                           </option>
                        </select>
                        <small className="form-text text-muted">
                           <FormattedMessage
                              id="ECOMMERCE.COMMON.FILTER"
                              tagName="b"
                           />
                           <FormattedMessage id="ECOMMERCE.COMMON.BY_STATUS" />
                        </small>
                     </div>
                     <div className="col-lg-2">
                        <select
                           className="form-control"
                           // placeholder="Filter by Roll"
                           name="roll"
                           onBlur={handleBlur}
                           onChange={e => {
                              setFieldValue("roll", e.target.value);
                              handleSubmit();
                           }}
                           value={values.roll}
                        >
                           <option value="">
                              {formatMessage(intl, "ECOMMERCE.COMMON.ALL")}
                           </option>
                           <option value="admin">
                              {formatMessage(intl, "ECOMMERCE.COMMON.ADMIN")}
                           </option>
                           <option value="user">
                              {formatMessage(intl, "ECOMMERCE.COMMON.USER")}
                           </option>
                        </select>
                        <small className="form-text text-muted">
                           <FormattedMessage
                              id="ECOMMERCE.COMMON.FILTER"
                              tagName="b"
                           />
                           <FormattedMessage id="ECOMMERCE.COMMON.BY_ROLE" />
                        </small>
                     </div>
                     <div className="col-lg-2">
                        <input
                           type="text"
                           className="form-control"
                           name="searchText"
                           placeholder={formatMessage(
                              intl,
                              "ECOMMERCE.COMMON.SEARCH"
                           )}
                           onBlur={handleBlur}
                           value={values.searchText}
                           onChange={e => {
                              setFieldValue("searchText", e.target.value);
                              handleSubmit();
                           }}
                        />
                        <small className="form-text text-muted">
                           <FormattedMessage
                              tagName="b"
                              id="ECOMMERCE.COMMON.SEARCH"
                           />
                           <FormattedMessage id="ECOMMERCE.COMMON.IN" />
                           <FormattedMessage id={fieldsIds[values.searchBy]} />
                        </small>
                     </div>
                     <div className="col-lg-2">
                        <select
                           className="form-control"
                           placeholder="Filter by "
                           name="searchBy"
                           onBlur={handleBlur}
                           onChange={e => {
                              setFieldValue("searchBy", e.target.value);
                              handleSubmit();
                           }}
                           value={values.searchBy}
                        >
                           <option value="fullName">
                              {formatMessage(intl, fieldsIds.fullName)}
                           </option>
                           <option value="email">
                              {formatMessage(intl, fieldsIds.email)}
                           </option>
                           <option value="mobile">
                              {formatMessage(intl, fieldsIds.mobile)}
                           </option>
                        </select>
                        <small className="form-text text-muted">
                           <FormattedMessage
                              tagName="b"
                              id="ECOMMERCE.COMMON.SEARCH"
                           />
                           <FormattedMessage id="ECOMMERCE.COMMON.BY" />
                           <FormattedMessage id={fieldsIds[values.searchBy]} />
                        </small>
                     </div>
                  </div>
               </form>
            )}
         </Formik>
      </>
   );
}
