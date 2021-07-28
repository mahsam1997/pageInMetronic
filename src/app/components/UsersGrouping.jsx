import React, { useMemo } from "react";
import { useUsersUIContext } from "../context/UsersUIContext";

import { useTranslation } from "react-i18next";
import CustomButton from "./common/CustomButton";

function UsersGrouping() {
   // Users UI Context
   const usersUIContext = useUsersUIContext();
   const usersUIProps = useMemo(() => {
      return {
         ids: usersUIContext.ids,
         setIds: usersUIContext.setIds,
         openDeleteUsersDialog: usersUIContext.openDeleteUsersDialog,
      };
   }, [usersUIContext]);

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
                           <b>{usersUIProps.ids.length}</b>
                        </span>
                     </label>
                  </div>
                  <div>
                     <CustomButton
                        title="messages.DEFAULT.DELETE_ALL"
                        onClick={usersUIProps.openDeleteUsersDialog}
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

export default UsersGrouping;
