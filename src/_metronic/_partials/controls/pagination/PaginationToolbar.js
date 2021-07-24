/* eslint-disable no-unused-vars */
import React from "react";
import { PaginationTotalStandalone } from "react-bootstrap-table2-paginator";

import { FormattedMessage, useIntl } from "react-intl";
import toFarsiNumber from "../../../../app/utils/toFarsiNumber";

const CustomTotal = (from, to, size) => {
   const isEnglish = useIntl().locale === "en";

   return (
      <span className="react-bootstrap-table-pagination-total">
         {isEnglish ? (
            <FormattedMessage
               id="ECOMMERCE.CUSTOMERS.SHOWING_ITEMS"
               values={{
                  from,
                  to,
                  size,
               }}
            />
         ) : (
            <FormattedMessage
               id="ECOMMERCE.CUSTOMERS.SHOWING_ITEMS"
               values={{
                  from: toFarsiNumber(from),
                  to: toFarsiNumber(to),
                  size: toFarsiNumber(size),
               }}
            />
         )}
      </span>
   );
};

export function PaginationToolbar(props) {
   const { isLoading, paginationProps } = props;

   const isEnglish = useIntl().locale === "en";

   const {
      sizePerPageList,
      sizePerPage,
      totalSize,
      onSizePerPageChange = [
         { text: "3", value: 3 },
         { text: "5", value: 5 },
         { text: "10", value: 10 },
      ],
   } = paginationProps;
   const style = {
      width: "75px",
   };

   const onSizeChange = event => {
      const newSize = +event.target.value;
      onSizePerPageChange(newSize);
   };

   return (
      <div className="d-flex align-items-center py-3">
         {isLoading && (
            <div className="d-flex align-items-center">
               <div className="mr-2 text-muted">
                  <FormattedMessage id={props.id} />
               </div>
               <div className="spinner spinner-primary mr-10"></div>
            </div>
         )}
         <select
            disabled={totalSize === 0}
            className={`form-control form-control-sm font-weight-bold mr-4 border-0 bg-light ${totalSize ===
               0 && "disabled"}`}
            onChange={onSizeChange}
            value={sizePerPage}
            style={style}
         >
            {sizePerPageList.map(option => {
               // const isSelect = sizePerPage === `${option.page}`;
               const isSelect = sizePerPage === option.value;
               return (
                  <option
                     key={option.text}
                     value={option.value}
                     className={`btn ${isSelect ? "active" : ""}`}
                  >
                     {isEnglish ? option.text : toFarsiNumber(option.text)}
                  </option>
               );
            })}
         </select>
         <PaginationTotalStandalone
            className="text-muted"
            {...paginationProps}
            paginationTotalRenderer={CustomTotal}
         />
      </div>
   );
}

PaginationToolbar.defaultProps = {
   id: "DEFAULT.LOADING",
};
