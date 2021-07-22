import React, { useMemo } from "react";
import { useCustomersUIContext } from "../CustomersUIContext";

import { FormattedMessage } from "react-intl";
import CustomButton from "../../../../../components/common/CustomButton";

export function CustomersGrouping() {
   // Customers UI Context
   const customersUIContext = useCustomersUIContext();
   const customersUIProps = useMemo(() => {
      return {
         ids: customersUIContext.ids,
         setIds: customersUIContext.setIds,
         openDeleteCustomersDialog:
            customersUIContext.openDeleteCustomersDialog,
         openFetchCustomersDialog: customersUIContext.openFetchCustomersDialog,
         openUpdateCustomersStatusDialog:
            customersUIContext.openUpdateCustomersStatusDialog,
      };
   }, [customersUIContext]);

   return (
      <div className="form">
         <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
            <div className="col-xl-12">
               <div className="form-group form-group-inline">
                  <div className="form-label form-label-no-wrap">
                     <label className="font-bold font-danger">
                        <span>
                           <FormattedMessage id="ECOMMERCE.COMMON.SELECTED_RECORDS_COUNT" />{" "}
                           <b>{customersUIProps.ids.length}</b>
                        </span>
                     </label>
                  </div>
                  <div>
                     <CustomButton
                        title="DEFAULT.DELETE_ALL"
                        onClick={customersUIProps.openDeleteCustomersDialog}
                        classNames="btn btn-danger font-weight-bolder font-size-sm"
                     >
                        <i className="fa fa-trash"></i>
                     </CustomButton>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
