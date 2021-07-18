import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

import { CustomerEditDialogHeader } from "./CustomerEditDialogHeader";
import { CustomerEditForm } from "./CustomerEditForm";
import { useCustomersUIContext } from "../CustomersUIContext";

import { getUser, editUser } from "../../../../../services/users.service";

const customerForEditInitialValue = {
   email: "",
   mobile: "",
   profile: {
      fullName: "",
   },
};

export function CustomerEditDialog({ id, show, onHide }) {
   const [customerForEdit, setCustomerForEdit] = useState(
      customerForEditInitialValue
   );
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
      const getCustomer = async () => {
         const response = await getUser(id);
         if (response.data.success) {
            setCustomerForEdit(response.data.data);
         }
      };
      if (id) {
         getCustomer();
      }

      return () => setCustomerForEdit(customerForEditInitialValue);
   }, [id]);

   // server request for saving customer
   const saveCustomer = async customer => {
      const user = {
         profile: {
            fullName: customer.fullName,
         },
         mobile: `${customer.subMobile}${customer.mobile}`,
         email: customer.email,
      };
      if (!id) {
         // server request for creating customer
      } else {
         // server request for updating customer
         setLoading(true);
         const response = await editUser(id, user);
         setLoading(false);
         if (response?.data.success) {
            onHide();
         }
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
