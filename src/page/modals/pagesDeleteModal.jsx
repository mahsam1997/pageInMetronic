import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import { usePageListUIContext } from "../context/pageListUiContex";
import { ModalProgressBar } from "../../_metronic/_partials/controls";

import { useTranslation } from "react-i18next";
import CustomButton from "../components/common/CustomButton";

import { deletePage } from "../services/pages.service";

function PagesDeleteModal({ show, onHide }) {
   const [loading, setLoading] = useState(false);

   const { t } = useTranslation();

   // Users UI Context
   const pageListUIContext =  usePageListUIContext();
   const pagesUIProps = useMemo(() => {
      return {
         ids: pageListUIContext.ids,
         setIds: pageListUIContext.setIds,
         queryParams: pageListUIContext.queryParams,
         setIsModalClose: pageListUIContext.setIsModalClose,
      };
   }, [pageListUIContext]);

   // if customers weren't selected we should close modal
   useEffect(() => {
      if (!pagesUIProps.ids || pagesUIProps.ids.length === 0) {
         onHide();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [pagesUIProps.ids]);

   useEffect(() => {
      return () => pagesUIProps.setIsModalClose(prevState => !prevState);

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   const deletePages = () => {
      setLoading(true);

      // server request for deleting customer by selected ids
      pagesUIProps.ids.forEach(async (id, index, array) => {
         await deletePage(id);
         if (index === array.length - 1) {
            setLoading(false);
         }
      });

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
               {t("messages.USERS.DELETE_USERS_SIMPLE.TITLE")}
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {!loading && (
               <span>{t("messages.USERS.DELETE_USER_MULTY.DESCRIPTION")}</span>
            )}
            {loading && (
               <span>
                  {t("messages.USERS.DELETE_USER_MULTY.WAIT_DESCRIPTION")}
               </span>
            )}
         </Modal.Body>
         <Modal.Footer>
            <CustomButton
               title="messages.AUTH.GENERAL.CANCEL"
               onClick={onHide}
               classNames="btn btn-light btn-elevate"
            />
            <CustomButton
               title="messages.DEFAULT.DELETE"
               onClick={deletePages}
               classNames="btn btn-primary btn-elevate"
            />
         </Modal.Footer>
      </Modal>
   );
}

export default PagesDeleteModal;
