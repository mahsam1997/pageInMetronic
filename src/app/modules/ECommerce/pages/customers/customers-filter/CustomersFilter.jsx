import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useCustomersUIContext } from "../CustomersUIContext";
// import { Select } from "../../../../../../_metronic/_partials/controls";

import { FormattedMessage, useIntl } from "react-intl";
import CustomDebounceInput from "../../../../../components/common/CustomDebounceInput";
import CustomSelect from "../../../../../components/common/CustomSelect";
import formatMessage from "../../../../../utils/formatMessage";

import {
   statusPrefixOptions,
   rolePrefixOptions,
   fieldsIds,
   searchByPrefixOptions,
} from "../../../../../enums/CustomersPrefixOptions";

const prepareFilter = (queryParams, values) => {
   const { status, role, searchText, searchBy } = values;
   const newQueryParams = { ...queryParams };
   const filter = {};
   // Filter by status
   filter.status = status;
   // Filter by roll
   filter.role = role;

   // Filter by all fields
   if (searchText) {
      filter.searchKey = searchBy;
      filter[searchBy] = searchText;
   }
   newQueryParams.filter = filter;
   return newQueryParams;
};

const mobileRemoveFirstChar = value => {
   if (value[0] === "+" || value[0] === "0") {
      console.log(value.slice(1));
      return value.slice(1);
   }
   return value;
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
               role: "",
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
               setFieldTouched,
            }) => (
               <form onSubmit={handleSubmit} className="form form-label-right">
                  <div className="form-group row">
                     <div className="col-lg-2">
                        {/* <Select
                           className="form-control"
                           name="status"
                           onChange={e => {
                              setFieldValue("status", e.target.value);
                              handleSubmit();
                           }}
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
                        </Select> */}
                        <CustomSelect
                           options={statusPrefixOptions(intl, formatMessage)}
                           value={values.status}
                           onChange={value => {
                              setFieldValue("status", value.value);
                              handleSubmit();
                           }}
                           onBlur={() => setFieldTouched("status", true)}
                           name="status"
                        />
                        <small className="form-text text-muted">
                           <FormattedMessage
                              id="ECOMMERCE.COMMON.FILTER"
                              tagName="b"
                           />
                           <FormattedMessage id="ECOMMERCE.COMMON.BY_STATUS" />
                        </small>
                     </div>
                     <div className="col-lg-2">
                        {/* <select
                           className="form-control"
                           name="roll"
                           onBlur={handleBlur}
                           onChange={e => {
                              setFieldValue("role", e.target.value);
                              handleSubmit();
                           }}
                           value={values.role}
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
                        </select> */}

                        <CustomSelect
                           options={rolePrefixOptions(intl, formatMessage)}
                           value={values.role}
                           onChange={value => {
                              setFieldValue("role", value.value);
                              handleSubmit();
                           }}
                           onBlur={() => setFieldTouched("role", true)}
                           name="role"
                        />
                        <small className="form-text text-muted">
                           <FormattedMessage
                              id="ECOMMERCE.COMMON.FILTER"
                              tagName="b"
                           />
                           <FormattedMessage id="ECOMMERCE.COMMON.BY_ROLE" />
                        </small>
                     </div>
                     <div className="col-lg-3">
                        {/* <select
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
                        </select> */}

                        <CustomSelect
                           options={searchByPrefixOptions(intl, formatMessage)}
                           value={values.searchBy}
                           onChange={value => {
                              setFieldValue("searchBy", value.value);
                              handleSubmit();
                           }}
                           onBlur={() => setFieldTouched("searchBy", true)}
                           name="searchBy"
                        />
                        <small className="form-text text-muted">
                           <FormattedMessage
                              tagName="b"
                              id="ECOMMERCE.COMMON.SEARCH"
                           />
                           <FormattedMessage id="ECOMMERCE.COMMON.BY" />
                           <FormattedMessage id={fieldsIds[values.searchBy]} />
                        </small>
                     </div>
                     <div className="col-lg-3">
                        <CustomDebounceInput
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
                              const value =
                                 values.searchBy === "mobile"
                                    ? mobileRemoveFirstChar(e.target.value)
                                    : e.target.value;
                              setFieldValue("searchText", value);
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
                  </div>
               </form>
            )}
         </Formik>
      </>
   );
}