import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { ModalProgressBar } from "../../_metronic/_partials/controls";
import { deleteUser } from "../services/users.service";

import { useTranslation } from "react-i18next";
import { useUsersUIContext } from "../context/UsersUIContext";
import CustomButton from "../components/common/CustomButton";

function UserDeleteModal({ id, show, onHide }) {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState("");

   const { t } = useTranslation();

   const usersUIContext = useUsersUIContext();
   const usersUIProps = useMemo(() => {
      return {
         setIsModalClose: usersUIContext.setIsModalClose,
      };
   }, [usersUIContext]);

   // if !id we should close modal
   useEffect(() => {
      if (!id) {
         onHide();
      }

      return () => usersUIProps.setIsModalClose(prevState => !prevState);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);

   const deleteUserFn = async () => {
      // server request for deleting customer by id
      setLoading(true);
      const response = await deleteUser(id);
      if (response?.data?.success) onHide();
      else if (response?.errorMessage) {
         response.response.data.errors.forEach(errorMsg =>
            setError(errorMsg.error)
         );
      }
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
               {t("messages.USERS.DELETE_USER_SIMPLE.TITLE")}
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {!loading && !error && (
               <span>{t("messages.USERS.DELETE_USER_SIMPLE.DESCRIPTION")}</span>
            )}
            {loading && (
               <span>
                  {t("messages.USERS.DELETE_USER_SIMPLE.WAIT_DESCRIPTION")}
               </span>
            )}
            {error && <span>{error}</span>}
         </Modal.Body>
         <Modal.Footer>
            <CustomButton
               title="messages.AUTH.GENERAL.CANCEL"
               onClick={onHide}
               classNames="btn btn-light btn-elevate"
            />
            <CustomButton
               title="messages.DEFAULT.DELETE"
               onClick={deleteUserFn}
               classNames="btn btn-primary btn-elevate"
            />
         </Modal.Footer>
      </Modal>
   );
}

export default UserDeleteModal;
