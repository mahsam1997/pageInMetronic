import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../_metronic/_partials/controls";
import { FormattedMessage } from "react-intl";
import { deleteUser } from "../services/users.service";

import CustomButton from "../components/common/CustomButton";

function UserDeleteDialog({ id, show, onHide }) {
   const [loading, setLoading] = useState(false);

   // if !id we should close modal
   useEffect(() => {
      if (!id) {
         onHide();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);

   const deleteUserFn = async () => {
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
               <FormattedMessage id="USERS.DELETE_USER_SIMPLE.TITLE" />
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {!loading && (
               <span>
                  <FormattedMessage id="USERS.DELETE_USER_SIMPLE.DESCRIPTION" />
               </span>
            )}
            {loading && (
               <span>
                  <FormattedMessage id="USERS.DELETE_USER_MULTY.WAIT_DESCRIPTION" />
               </span>
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
               onClick={deleteUserFn}
               classNames="btn btn-primary btn-elevate"
            />
         </Modal.Footer>
      </Modal>
   );
}

export default UserDeleteDialog;
