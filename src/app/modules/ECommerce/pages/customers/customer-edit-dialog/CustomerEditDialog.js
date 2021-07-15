import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

import { CustomerEditDialogHeader } from "./CustomerEditDialogHeader";
import { CustomerEditForm } from "./CustomerEditForm";
import { useCustomersUIContext } from "../CustomersUIContext";

import { getUser } from "../../../../../services/users.service";

export function CustomerEditDialog({ id, show, onHide }) {
   const [customerForEdit, setCustomerForEdit] = useState({
      fullName: "Mahdi zoraghi",
      email: "mahdi@gmail.com",
      mobile: "+9893302520",
   });
   const [loading, setLoading] = useState(false);

   // Customers UI Context
   const customersUIContext = useCustomersUIContext();
   const customersUIProps = useMemo(() => {
      return {
         initCustomer: customersUIContext.initCustomer,
      };
   }, [customersUIContext]);

   useEffect(() => {
      // server call for getting Customer by id
      // server call for getting Customer by id
      const getCustomer = async () => {
         const response = await getUser(id);
         console.log(response);
      };
      if (id) {
         getCustomer();
      }
   }, [id]);

   // server request for saving customer
   const saveCustomer = customer => {
      if (!id) {
         // server request for creating customer
         //  dispatch(actions.createCustomer(customer)).then(() => onHide());
      } else {
         // server request for updating customer
         //  dispatch(actions.updateCustomer(customer)).then(() => onHide());
      }
   };

   return (
      <Modal
         size="lg"
         show={show}
         onHide={onHide}
         aria-labelledby="example-modal-sizes-title-lg"
      >
         <CustomerEditDialogHeader
            id={id}
            customerForEdit={customerForEdit}
            loading={loading}
         />
         <CustomerEditForm
            saveCustomer={saveCustomer}
            actionsLoading={loading}
            customer={customerForEdit || customersUIProps.initCustomer}
            onHide={onHide}
         />
      </Modal>
   );
}
