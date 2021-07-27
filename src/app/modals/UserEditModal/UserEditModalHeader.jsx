import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

import formatMessage from "../../utils/formatMessage";

function UserEditDialogHeader({ id, userForEdit, loading }) {
   const [title, setTitle] = useState("");

   const intl = useIntl();

   // Title Form
   useEffect(() => {
      let _title = id ? "" : formatMessage(intl, "USERS.NEW_USER");
      if (userForEdit && id) {
         _title = `${formatMessage(intl, "USERS.EDIT_USER")} '${
            userForEdit.profile.fullName
         }'`;
      }

      setTitle(_title);
      // eslint-disable-next-line
   }, [userForEdit, loading]);

   return (
      <>
         {loading && <ModalProgressBar />}
         <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
         </Modal.Header>
      </>
   );
}

export default UserEditDialogHeader;
