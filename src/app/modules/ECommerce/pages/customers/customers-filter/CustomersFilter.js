import React, { useMemo } from "react";
import { Formik } from "formik";
import { isEqual } from "lodash";
import { useCustomersUIContext } from "../CustomersUIContext";

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

export function CustomersFilter({ listLoading }) {
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
                           placeholder="Filter by Status"
                           // TODO: Change this code
                           onChange={e => {
                              setFieldValue("status", e.target.value);
                              handleSubmit();
                           }}
                           onBlur={handleBlur}
                           value={values.status}
                        >
                           <option value="">All</option>
                           <option value="active">Active</option>
                           <option value="removed">Removed</option>
                        </select>
                        <small className="form-text text-muted">
                           <b>Filter</b> by Status
                        </small>
                     </div>
                     <div className="col-lg-2">
                        <select
                           className="form-control"
                           placeholder="Filter by Roll"
                           name="roll"
                           onBlur={handleBlur}
                           onChange={e => {
                              setFieldValue("roll", e.target.value);
                              handleSubmit();
                           }}
                           value={values.roll}
                        >
                           <option value="">All</option>
                           <option value="admin">Admin</option>
                           <option value="user">User</option>
                        </select>
                        <small className="form-text text-muted">
                           <b>Filter</b> by Roll
                        </small>
                     </div>
                     <div className="col-lg-2">
                        <input
                           type="text"
                           className="form-control"
                           name="searchText"
                           placeholder="Search"
                           onBlur={handleBlur}
                           value={values.searchText}
                           onChange={e => {
                              setFieldValue("searchText", e.target.value);
                              handleSubmit();
                           }}
                        />
                        <small className="form-text text-muted">
                           <b>Search</b> in all fields
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
                           <option value="fullName">Full Name</option>
                           <option value="email">Email</option>
                           <option value="mobile">Mobile</option>
                        </select>
                        <small className="form-text text-muted">
                           <b>Search</b> by {values.searchBy}
                        </small>
                     </div>
                  </div>
               </form>
            )}
         </Formik>
      </>
   );
}
