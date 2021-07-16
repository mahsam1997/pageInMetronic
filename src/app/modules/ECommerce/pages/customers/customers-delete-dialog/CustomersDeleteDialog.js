import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useCustomersUIContext } from "../CustomersUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

import { deleteUser } from "../../../../../services/users.service";

export function CustomersDeleteDialog({ show, onHide }) {
   const [loading, setLoading] = useState(false);

   // Customers UI Context
   const customersUIContext = useCustomersUIContext();
   const customersUIProps = useMemo(() => {
      return {
         ids: customersUIContext.ids,
         setIds: customersUIContext.setIds,
         queryParams: customersUIContext.queryParams,
      };
   }, [customersUIContext]);

   // if customers weren't selected we should close modal
   useEffect(() => {
      if (!customersUIProps.ids || customersUIProps.ids.length === 0) {
         onHide();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [customersUIProps.ids]);

   const deleteCustomers = () => {
      setLoading(true);

      // server request for deleting customer by selected ids
      customersUIProps.ids.forEach(async id => {
         await deleteUser(id);
      });
      setLoading(false);
      customersUIProps.setIds([]);
      onHide();
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
               Customers Delete
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {!loading && (
               <span>
                  Are you sure to permanently delete selected customers?
               </span>
            )}
            {loading && <span>Customer are deleting...</span>}
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
                  onClick={deleteCustomers}
                  className="btn btn-primary btn-elevate"
               >
                  Delete
               </button>
            </div>
         </Modal.Footer>
      </Modal>
   );
}
