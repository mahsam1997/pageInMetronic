/* eslint-disable no-unused-vars */
import React from "react";
import { PaginationTotalStandalone } from "react-bootstrap-table2-paginator";

import { useTranslation } from "react-i18next";
import CustomSelect from "../../../../app/components/common/CustomSelect";
import toFarsiNumber from "../../../../app/utils/toFarsiNumber";

//
import { FormattedMessage } from "react-intl";

const CustomTotal = (from, to, size) => {
   const { i18n } = useTranslation();

   const isLtrDir = i18n.dir() === "ltr";

   return (
      <div className="react-bootstrap-table-pagination-total mr-15">
         {isLtrDir ? (
            <FormattedMessage
               id="ECOMMERCE.CUSTOMERS.SHOWING_ITEMS"
               values={{ from, to, size }}
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

   const { i18n } = useTranslation();

   const isLtrDir = i18n.dir() === "ltr";

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

         <CustomSelect
            isDisabled={totalSize === 0}
            options={sizePerPageList}
            getOptionLabel={option =>
               isLtrDir ? option.text : toFarsiNumber(option.text)
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
         />
      </div>
   );
}

PaginationToolbar.defaultProps = {
   id: "DEFAULT.LOADING",
};
