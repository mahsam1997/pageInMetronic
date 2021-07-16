import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { useCustomersUIContext } from "../CustomersUIContext";

import { getUser, editUser } from "../../../../../services/users.service";

export function CustomersUpdateStateDialog({ show, onHide }) {
   const [loading, setLoading] = useState(false);
   const [status, setStatus] = useState(0);
   const [customers, setCustomers] = useState([]);

   // Customers UI Context
   const customersUIContext = useCustomersUIContext();
   const customersUIProps = useMemo(() => {
      return {
         ids: customersUIContext.ids,
         setIds: customersUIContext.setIds,
         queryParams: customersUIContext.queryParams,
      };
   }, [customersUIContext]);

   // if !id we should close modal
   useEffect(() => {
      if (!customersUIProps.ids || customersUIProps.ids.length === 0) {
         onHide();
      } else {
         setLoading(true);
         console.log("<CustomersFetchDialog /> ids: ", customersUIProps.ids);
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

   const updateStatus = async () => {
      console.log("updateStatus: ", customers[0]);
      const editedUser = {
         ...customers[0],
         status: "active",
      };
      console.log("edited user: ", editedUser);
      const response = await editUser(customers[0]._id, editedUser);
      console.log("response edited user: ", response.data);
      // server request for update customers status by selected ids
      // dispatch(actions.updateCustomersStatus(customersUIProps.ids, status)).then(
      // () => {
      // refresh list after deletion
      // dispatch(actions.fetchCustomers(customersUIProps.queryParams)).then(
      // () => {
      // clear selections list
      // customersUIProps.setIds([]);
      // closing delete modal
      onHide();
      // }
      // );
      // }
      // );
   };

   return (
      <Modal
         show={show}
         onHide={onHide}
         aria-labelledby="example-modal-sizes-title-lg"
      >
         <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
               Status has been updated for selected customers
            </Modal.Title>
         </Modal.Header>
         <Modal.Body className="overlay overlay-block cursor-default">
            {/*begin::Loading*/}
            {loading && (
               <div className="overlay-layer">
                  <div className="spinner spinner-lg spinner-primary" />
               </div>
            )}
            {/*end::Loading*/}
            <table className="table table table-head-custom table-vertical-center overflow-hidden">
               <thead>
                  <tr>
                     <th>Role</th>
                     <th>STATUS</th>
                     <th>Full Name</th>
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
         <Modal.Footer className="form">
            <div className="form-group">
               <select
                  className="form-control"
                  value={status}
                  onChange={e => setStatus(+e.target.value)}
               >
                  <option value="0">Suspended</option>
                  <option value="1">Active</option>
                  <option value="2">Pending</option>
               </select>
            </div>
            <div className="form-group">
               <button
                  type="button"
                  onClick={onHide}
                  className="btn btn-light btn-elevate mr-3"
               >
                  Cancel
               </button>
               <button
                  type="button"
                  onClick={updateStatus}
                  className="btn btn-primary btn-elevate"
               >
                  Update Status
               </button>
            </div>
         </Modal.Footer>
      </Modal>
   );
}
