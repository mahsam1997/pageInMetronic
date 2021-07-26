import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { useUsersUIContext } from "../context/UsersUIContext";
import { ModalProgressBar } from "../../_metronic/_partials/controls";

import { FormattedMessage } from "react-intl";
import CustomButton from "../components/common/CustomButton";

import { deleteUser } from "../services/users.service";

function UsersDeleteDialog({ show, onHide }) {
   const [loading, setLoading] = useState(false);

   // Users UI Context
   const usersUIContext = useUsersUIContext();
   const usersUIProps = useMemo(() => {
      return {
         ids: usersUIContext.ids,
         setIds: usersUIContext.setIds,
         queryParams: usersUIContext.queryParams,
      };
   }, [usersUIContext]);

   // if customers weren't selected we should close modal
   useEffect(() => {
      if (!usersUIProps.ids || usersUIProps.ids.length === 0) {
         onHide();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [usersUIProps.ids]);

   const deleteUsers = () => {
      setLoading(true);

      // server request for deleting customer by selected ids
      usersUIProps.ids.forEach(async id => {
         await deleteUser(id);
      });
      setLoading(false);
      usersUIProps.setIds([]);
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
               <FormattedMessage id="USERS.DELETE_USERS_SIMPLE.TITLE" />
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {!loading && (
               <FormattedMessage
                  id="USERS.DELETE_USER_MULTY.DESCRIPTION"
                  tagName="span"
               />
            )}
            {loading && (
               <FormattedMessage
                  id="USERS.DELETE_USER_MULTY.WAIT_DESCRIPTION"
                  tagName="span"
               />
            )}
         </Modal.Body>
         <Modal.Footer>
            <CustomButton
               title="AUTH.GENERAL.CANCEL"
               onClick={onHide}
               classNames="btn btn-light btn-elevate"
            />
            <CustomButton
               title="DEFAULT.DELETE"
               onClick={deleteUsers}
               classNames="btn btn-primary btn-elevate"
            />
         </Modal.Footer>
      </Modal>
   );
}

export default UsersDeleteDialog;
