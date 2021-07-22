import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useCustomersUIContext } from "../CustomersUIContext";

import { FormattedMessage } from "react-intl";

import { getUser } from "../../../../../services/users.service";

export function CustomersFetchDialog({ show, onHide }) {
   const [loading, setLoading] = useState(false);
   const [customers, setCustomers] = useState([]);

   // Customers UI Context
   const customersUIContext = useCustomersUIContext();
   const customersUIProps = useMemo(() => {
      return {
         ids: customersUIContext.ids,
      };
   }, [customersUIContext]);

   // if customers weren't selected we should close modal
   useEffect(() => {
      if (!customersUIProps.ids || customersUIProps.ids.length === 0) {
         onHide();
      } else {
         setLoading(true);
         customersUIProps.ids.forEach(async id => {
            const response = await getUser(id);
            if (response?.data.success) {
               setCustomers(prevState => [...prevState, response.data.data]);
            }
         });
         setLoading(false);
      }

      return () => setCustomers([]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [customersUIProps.ids]);

   return (
      <Modal
         show={show}
         onHide={onHide}
         aria-labelledby="example-modal-sizes-title-lg"
      >
         <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
               <FormattedMessage id="ECOMMERCE.CUSTOMERS.FETCH_CUSTOMERS" />
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {/*begin::Loading*/}
            {loading && (
               <div className="overlay-layer">
                  <div className="spinner spinner-lg spinner-primary" />
               </div>
            )}
            {/* end::Loading*/}
            <table className="table table table-head-custom table-vertical-center overflow-hidden">
               <thead>
                  <tr>
                     <FormattedMessage
                        tagName="th"
                        id="ECOMMERCE.CUSTOMERS.ROLE"
                     />
                     <FormattedMessage
                        tagName="th"
                        id="ECOMMERCE.CUSTOMERS.STATUS"
                     />
                     <FormattedMessage tagName="th" id="AUTH.INPUT.FULLNAME" />
                  </tr>
               </thead>
               <tbody>
                  {customers.map(customer => (
                     <tr key={`id${customer._id}`}>
                        <td>{customer.role}</td>
                        <td>
                           <span
                              className={`label label-lg label-light-${
                                 customer.status === "active" ? "success" : ""
                              } label-inline`}
                           >
                              {customer.status}
                           </span>
                        </td>
                        <td>
                           <span className="ml-3">
                              {customer.profile.fullName}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
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
                  onClick={onHide}
                  className="btn btn-primary btn-elevate"
               >
                  <FormattedMessage id="ECOMMERCE.COMMON.OK" />
               </button>
            </div>
         </Modal.Footer>
      </Modal>
   );
}
