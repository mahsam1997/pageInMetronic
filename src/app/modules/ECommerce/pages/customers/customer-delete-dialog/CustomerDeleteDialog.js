import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

import { deleteUser } from "../../../../../services/users.service";

export function CustomerDeleteDialog({ id, show, onHide }) {
   const [loading, setLoading] = useState(false);

   // if !id we should close modal
   useEffect(() => {
      if (!id) {
         onHide();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);

   const deleteCustomer = async () => {
      // server request for deleting customer by id
      setLoading(true);
      const response = await deleteUser(id);
      response?.data?.success && onHide();
      setLoading(false);
   };

   return (
      <Modal
         show={show}
         onHide={onHide}
         aria-labelledby="example-modal-sizes-title-lg"
      >
         {/*begin::Loading*/}
         {loading && <ModalProgressBar />}
         {/*end::Loading*/}
         <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
               Customer Delete
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {!loading && (
               <span>Are you sure to permanently delete this customer?</span>
            )}
            {loading && <span>Customer is deleting...</span>}
         </Modal.Body>
         <Modal.Footer>
            <div>
               <button
                  type="button"
                  onClick={onHide}
                  className="btn btn-light btn-elevate"
               >
                  Cancel
               </button>
               <> </>
               <button
                  type="button"
                  onClick={deleteCustomer}
                  className="btn btn-primary btn-elevate"
               >
                  Delete
               </button>
            </div>
         </Modal.Footer>
      </Modal>
   );
}
