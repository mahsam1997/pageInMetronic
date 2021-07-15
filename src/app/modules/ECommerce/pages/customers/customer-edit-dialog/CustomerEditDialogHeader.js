import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

export function CustomerEditDialogHeader({ id, customerForEdit, loading }) {
   // Customers Redux state
   // const { customerForEdit, actionsLoading } = useSelector(
   //   (state) => ({
   //     customerForEdit: state.customers.customerForEdit,
   //     actionsLoading: state.customers.actionsLoading,
   //   }),
   //   shallowEqual
   // );

   const [title, setTitle] = useState("");
   // Title couting
   useEffect(() => {
      let _title = id ? "" : "New Customer";
      if (customerForEdit && id) {
         _title = `Edit customer '${customerForEdit.fullName}'`;
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
