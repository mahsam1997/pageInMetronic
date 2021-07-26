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
                     <div className="col-lg-2 mb-4">
                        <small className="form-text text-muted mb-1">
                           <FormattedMessage
                              id="ECOMMERCE.COMMON.FILTER"
                              tagName="b"
                           />
                           <FormattedMessage id="ECOMMERCE.COMMON.BY_STATUS" />
                        </small>
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
                     </div>
                     <div className="col-lg-2 mb-4">
                        <small className="form-text text-muted mb-1">
                           <FormattedMessage
                              id="ECOMMERCE.COMMON.FILTER"
                              tagName="b"
                           />
                           <FormattedMessage id="ECOMMERCE.COMMON.BY_ROLE" />
                        </small>
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
                     </div>
                     <div className="col-lg-3 mb-4">
                        <small className="form-text text-muted mb-1">
                           <FormattedMessage
                              tagName="b"
                              id="ECOMMERCE.COMMON.SEARCH"
                           />
                           <FormattedMessage id="ECOMMERCE.COMMON.BY" />
                           <FormattedMessage id={fieldsIds[values.searchBy]} />
                        </small>
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
                     </div>
                     <div className="col-lg-3 mb-4">
                        <small className="form-text text-muted mb-1">
                           <FormattedMessage
                              tagName="b"
                              id="ECOMMERCE.COMMON.SEARCH"
                           />
                           <FormattedMessage id="ECOMMERCE.COMMON.IN" />
                           <FormattedMessage id={fieldsIds[values.searchBy]} />
                        </small>
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
                     </div>
                  </div>
               </form>
            )}
         </Formik>
      </>
   );
}
