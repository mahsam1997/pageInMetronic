import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../_metronic/_partials/controls";

import { useTranslation } from "react-i18next";

function UserEditModalHeader({ id, userForEdit, loading }) {
   const [title, setTitle] = useState("");

   const { t } = useTranslation();

   // Title Form
   useEffect(() => {
      let _title = id ? "" : t("messages.USERS.NEW_USER");
      if (userForEdit && id) {
         _title = `${t("messages.USERS.EDIT_USER")} '${
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

export default UserEditModalHeader;
