import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";

import UserEditDialogHeader from "./UserEditModalHeader";
import UserEditForm from "./UserEditForm";
import { useUsersUIContext } from "../../context/UsersUIContext";

import { getUser, editUser } from "../../services/users.service";

const userForEditInitialValue = {
   email: "",
   mobile: "",
   countryCode: "",
   profile: {
      fullName: "",
   },
};

function UserEditDialog({ id, show, onHide }) {
   const [userForEdit, setUserForEdit] = useState(userForEditInitialValue);
   const [loading, setLoading] = useState(false);

   const usersUIContext = useUsersUIContext();
   const usersUIProps = useMemo(() => {
      return {
         initUser: usersUIContext.initUser,
      };
   }, [usersUIContext]);

   useEffect(() => {
      // server call for getting User by id
      const receiveUser = async () => {
         const response = await getUser(id);
         if (response.data.success) {
            setUserForEdit(response.data.data);
         }
      };
      if (id) {
         receiveUser();
      }

      return () => setUserForEdit(userForEditInitialValue);
   }, [id]);

   // server request for saving user
   const saveUser = async user => {
      const newUser = {
         profile: {
            fullName: user.fullName,
         },
         mobile: `${user.mobile}`,
         countryCode: user.countryCode,
         email: user.email,
      };

      if (!id) {
         // server request for creating user
      } else {
         // server request for updating customer
         setLoading(true);
         const response = await editUser(id, newUser);
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
         <UserEditDialogHeader
            id={id}
            userForEdit={userForEdit}
            loading={loading}
         />
         <UserEditForm
            saveUser={saveUser}
            actionsLoading={loading}
            user={userForEdit || usersUIProps.initUser}
            onHide={onHide}
         />
      </Modal>
   );
}

export default UserEditDialog;
