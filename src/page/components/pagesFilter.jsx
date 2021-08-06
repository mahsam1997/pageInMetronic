import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import {usePageListUIContext } from "../context/pageListUiContex";

import CustomDebounceInput from "./common/CustomDebounceInput";
import CustomSelect from "./common/CustomSelect";
import { useTranslation } from "react-i18next";

import {
   statusPrefixOptions,
   rolePrefixOptions,
   fieldsIds,
   searchByPrefixOptions,
} from "../enums/pagesPrefixOptions";

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
      return value.slice(1);
   }
   return value;
};

function PagesFilter({ listLoading }) {
   const { t } = useTranslation();

   // pages UI Context
   const pageListUIContext =  usePageListUIContext();
   const pagesUIProps = useMemo(() => {
      return {
         queryParams: pageListUIContext.queryParams,
         setQueryParams:pageListUIContext.setQueryParams,
      };
   }, [pageListUIContext]);

   // queryParams, setQueryParams,
   const applyFilter = values => {
      const newQueryParams = prepareFilter(pagesUIProps.queryParams, values);
      if (!isEqual(newQueryParams, pagesUIProps.queryParams)) {
         newQueryParams.pageNumber = 1;
         // update list by queryParams
         pagesUIProps.setQueryParams(newQueryParams);
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
                           <b>{t("messages.USERS.COMMON.FILTER")}</b>{" "}
                           {t("messages.USERS.COMMON.BY_STATUS")}
                        </small>
                        <CustomSelect
                           options={statusPrefixOptions}
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
                           <b>{t("messages.USERS.COMMON.FILTER")}</b>{" "}
                           {t("messages.USERS.COMMON.BY_ROLE")}
                        </small>
                        <CustomSelect
                           options={rolePrefixOptions}
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
                           <b>{t("messages.USERS.COMMON.SEARCH")}</b>{" "}
                           {t("messages.USERS.COMMON.BY")}{" "}
                           {t(fieldsIds[values.searchBy])}
                        </small>
                        <CustomSelect
                           options={searchByPrefixOptions}
                           value={values.searchBy}
                           onChange={value =>
                              setFieldValue("searchBy", value.value)
                           }
                           onBlur={() => setFieldTouched("searchBy", true)}
                           name="searchBy"
                        />
                     </div>
                     <div className="col-lg-3 mb-4">
                        <small className="form-text text-muted mb-1">
                           <b>{t("messages.USERS.COMMON.SEARCH")}</b>{" "}
                           {t("messages.USERS.COMMON.IN")}{" "}
                           {t(fieldsIds[values.searchBy])}
                        </small>
                        <CustomDebounceInput
                           type="text"
                           className="form-control"
                           name="searchText"
                           placeholder={t("messages.USERS.COMMON.SEARCH")}
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

export default PagesFilter;
