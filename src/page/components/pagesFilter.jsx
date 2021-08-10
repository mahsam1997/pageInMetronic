// // export default PagesFilter;
import React, { useMemo, useState } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { usePageListUIContext } from "../context/pageListUiContex";
import ActionsFilterFormatter from "../components/ActionsFilterFormatter";
import CustomDebounceInput from "./common/CustomDebounceInput";
import CustomSelect from "./common/CustomSelect";
import { useTranslation } from "react-i18next";

import {
   statusPrefixOptions,
   languagePrefixOptions,
   fieldsIds,
   searchByPrefixOptions,
} from "../enums/pagesPrefixOptions";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
const prepareFilter = (queryParams, values) => {
   const { status, language, searchText, searchBy } = values;
   console.log(values);
   const newQueryParams = { ...queryParams };
   const filter = {};
   // Filter by status
   filter.status = status;
   // Filter by roll
   filter.language = language;

   // Filter by all fields
   if (searchText) {
      filter.searchKey = searchBy;
      filter[searchBy] = searchText;
   }
   newQueryParams.filter = filter;
   return newQueryParams;
};

function PagesFilter({ listLoading }) {
   const { t ,i18n} = useTranslation();

   // Users UI Context
   const pageListUIContext = usePageListUIContext();
   const pagesUIProps = useMemo(() => {
      return {
         queryParams: pageListUIContext.queryParams,
         setQueryParams: pageListUIContext.setQueryParams,
         openCreatePage:pageListUIContext.openCreatePage
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
               language: "",
               searchText: "",
               searchBy: "key",
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
                           <b>فیلتر براساس وضعیت</b>{" "}
                           {/* {t("messages.USERS.COMMON.BY_STATUS")}  */}
                        </small>
                        <CustomSelect
                           options={statusPrefixOptions}
                           placeholder="همه"
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
                           <b>فیلتر براساس زبان</b>{" "}
                           {/* {t("messages.USERS.COMMON.BY_ROLE")} */}
                        </small>
                        <CustomSelect
                           options={languagePrefixOptions}
                           value={values.language}
                           onChange={value => {
                              setFieldValue("language", value.value);
                              handleSubmit();
                           }}
                           onBlur={() => setFieldTouched("language", true)}
                           name="language"
                        />
                     </div>
                     <div className="col-lg-2 mb-4">
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
                     <div className="col-lg-4 mb-4">
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
                              const value = e.target.value;
                              setFieldValue("searchText", value);
                              handleSubmit();
                           }}
                        />
                     </div>
                     <div className="col-lg-2 mt-6">
                        <a
                           title={"افزودن پیج"}
                           className="btn btn-icon btn-light btn-hover-primary btn-lg mx-3"
                           onClick={() => pagesUIProps.openCreatePage()}
                        >
                           <span className="svg-icon svg-icon-xl svg-icon-primary">
                              <SVG
                                 src={toAbsoluteUrl(
                                    "/media/svg/icons/Files/Folder-plus.svg"
                                 )}
                              />
                           </span>
                        </a>
                     </div>
                  </div>
               </form>
            )}
         </Formik>
      </>
   );
}

export default PagesFilter;
