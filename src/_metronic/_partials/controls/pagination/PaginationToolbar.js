/* eslint-disable no-unused-vars */
import React from "react";
import { PaginationTotalStandalone } from "react-bootstrap-table2-paginator";

import { FormattedMessage, useIntl } from "react-intl";
import CustomSelect from "../../../../app/components/common/CustomSelect";
import toFarsiNumber from "../../../../app/utils/toFarsiNumber";

const CustomTotal = (from, to, size) => {
   const isEnglish = useIntl().locale === "en";

   return (
      <div className="react-bootstrap-table-pagination-total mr-15">
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
      </div>
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
         { text: "10", value: 10 },
         { text: "25", value: 25 },
         { text: "50", value: 50 },
         { text: "100", value: 100 },
         { text: "150", value: 150 },
         { text: "200", value: 200 },
      ],
   } = paginationProps;

   const onSizeChange = value => {
      const newSize = value.value;
      console.log(newSize);
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
         <PaginationTotalStandalone
            className="text-muted"
            {...paginationProps}
            paginationTotalRenderer={CustomTotal}
         />
         {/* <select
            disabled={totalSize === 0}
            className={`form-control form-control-sm font-weight-bold mr-4 border-0 bg-light ${totalSize ===
               0 && "disabled"}`}
            onChange={onSizeChange}
            value={sizePerPage}
            style={style}
         >
            {sizePerPageList.map(option => {
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
         </select> */}

         <CustomSelect
            isDisabled={totalSize === 0}
            options={sizePerPageList}
            getOptionLabel={option =>
               isEnglish ? option.text : toFarsiNumber(option.text)
            }
            customStyles={{
               width: "80px",
               padding: 0,
               top: "auto",
               bottom: "100%",
               margin: "0",
            }}
            value={{
               text: "" + sizePerPage,
               value: sizePerPage,
            }}
            defaultValue={{
               text: "" + sizePerPage,
               value: sizePerPage,
            }}
            menuPlacement="top"
            onChange={onSizeChange}
            customSingleValueStyles={
               {
                  // padding: "90px",
               }
            }
         />
      </div>
   );
}

PaginationToolbar.defaultProps = {
   id: "DEFAULT.LOADING",
};
