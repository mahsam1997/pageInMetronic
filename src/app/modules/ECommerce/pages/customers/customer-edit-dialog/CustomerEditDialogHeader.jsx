import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";
import { useIntl } from "react-intl";

import formatMessage from "../../../../../utils/formatMessage";

export function CustomerEditDialogHeader({ id, customerForEdit, loading }) {
   const [title, setTitle] = useState("");

   const intl = useIntl();

   // Title Form
   useEffect(() => {
      let _title = id
         ? ""
         : formatMessage(intl, "ECOMMERCE.CUSTOMERS.NEW_CUSTOMER");
      if (customerForEdit && id) {
         _title = `${formatMessage(
            intl,
            "ECOMMERCE.CUSTOMERS.EDIT_CUSTOMER"
         )} '${customerForEdit.profile.fullName}'`;
      }

      setTitle(_title);
      // eslint-disable-next-line
   }, [customerForEdit, loading]);

   return (
      <>
         {loading && <ModalProgressBar />}
         <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">{title}</Modal.Title>
         </Modal.Header>
      </>
   );
}
