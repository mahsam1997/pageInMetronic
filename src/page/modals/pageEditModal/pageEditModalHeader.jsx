import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../_metronic/_partials/controls";
import { useTranslation } from "react-i18next";

function PageEditModalHeader({ id, pageForEdit, loading }) {
   const [title, setTitle] = useState("");

   const { t } = useTranslation();

   // Title Form
   useEffect(() => {
      let _title = id ? "" : t("messages.USERS.NEW_USER");
      if (pageForEdit && id) {
         _title = `${t("messages.USERS.EDIT_USER")} '${
            pageForEdit.profile.fullName
         }'`;
      }

      setTitle(_title);
      // eslint-disable-next-line
   }, [pageForEdit, loading]);

   return (
      <>
         {loading && <ModalProgressBar />}
         <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
         </Modal.Header>
      </>
   );
}

export default PageEditModalHeader;
