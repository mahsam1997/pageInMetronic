import React, { useMemo } from "react";
import { usePageListUIContext } from "../context/pageListUiContex";

import { useTranslation } from "react-i18next";
import CustomButton from "./common/CustomButton";

function PagesGrouping() {
   // pages UI Context
   const pageListUIContext =  usePageListUIContext();
   const pagesUIProps = useMemo(() => {
      return {
         ids: pageListUIContext.ids,
         setIds: pageListUIContext.setIds,
         openDeletePagesModal: pageListUIContext.openDeletePagesModal,
      };
   }, [pageListUIContext]);

   const { t } = useTranslation();

   return (
      <div className="form">
         <div className="row align-items-center form-group-actions margin-top-20 margin-bottom-20">
            <div className="col-xl-12">
               <div className="form-group form-group-inline">
                  <div className="form-label form-label-no-wrap">
                     <label className="font-bold font-danger">
                        <span>
                           {t("messages.USERS.COMMON.SELECTED_RECORDS_COUNT")}{" "}
                           <b>{pagesUIProps.ids.length}</b>
                        </span>
                     </label>
                  </div>
                  <div>
                     <CustomButton
                        title="messages.DEFAULT.DELETE_ALL"
                        onClick={pagesUIProps.openDeletePagesModal}
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

export default PagesGrouping;
