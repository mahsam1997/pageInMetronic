import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useCustomersUIContext } from "../CustomersUIContext";
import { ModalProgressBar } from "../../../../../../_metronic/_partials/controls";

import { FormattedMessage } from "react-intl";

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
               <FormattedMessage id="ECOMMERCE.CUSTOMERS.DELETE_CUSTOMERS_SIMPLE.TITLE" />
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {!loading && (
               <FormattedMessage
                  id="ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.DESCRIPTION"
                  tagName="span"
               />
            )}
            {loading && (
               <FormattedMessage
                  id="ECOMMERCE.CUSTOMERS.DELETE_CUSTOMER_MULTY.WAIT_DESCRIPTION"
                  tagName="span"
               />
            )}
         </Modal.Body>
         <Modal.Footer>
            <div>
               <button
                  type="button"
                  onClick={onHide}
                  className="btn btn-light btn-elevate"
               >
                  <FormattedMessage id="AUTH.GENERAL.CANCEL" />
               </button>
               <> </>
               <button
                  type="button"
                  onClick={deleteCustomers}
                  className="btn btn-primary btn-elevate"
               >
                  <FormattedMessage id="ECOMMERCE.CUSTOMERS.DELETE" />
               </button>
            </div>
         </Modal.Footer>
      </Modal>
   );
}
