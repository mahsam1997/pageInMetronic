import React, { useEffect, useMemo, useState } from "react";
import { Modal } from "react-bootstrap";
import showToast from "../../utils/showToast";
import { useTranslation } from "react-i18next";
import PageCreateDialogHeader from "./pageCreatHeader";
import PageCreateForm from "./pageCreateForm";
import { usePageListUIContext } from "../../context/pageListUiContex";

import { getPage, editPage } from "../../services/pages.service";

const pageForEditInitialValue = {
   email: "",
   mobile: "",
   countryCode: "",
   profile: {
      fullName: "",
   },
};

function PageCreatModal({ id, show, onHide }) {
   const [pageForEdit, setPageForEdit] = useState(pageForEditInitialValue);
   const [loading, setLoading] = useState(false);
   const { t } = useTranslation();

   const pageListUIContext =usePageListUIContext();
   const pagesUIProps = useMemo(() => {
      return {
         initUser: pageListUIContext.initUser,
         setIsModalClose: pageListUIContext.setIsModalClose,
      };
   }, [pageListUIContext]);

   useEffect(() => {
      // server call for getting page by id
      const receivePage = async () => {
         const response = await getPage(id);
         if (response?.data?.success) {
            setPageForEdit(response.data.data);
         }
      };
      if (id) {
         receivePage();
      }

      return () => {
         setPageForEdit(pageForEditInitialValue);
         pagesUIProps.setIsModalClose(prevState => !prevState);
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [id]);

   // server request for saving user
   const savePage = async (user, setFieldError) => {
      const newPage = {
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
         const response = await editPage(id, newPage);
         setLoading(false);
         if (response?.data?.success) {
            onHide();
            showToast({
               text: t("messages.USERS.EDIT_SUCCESS_MESSAGE"),
            });
         } else if (response?.errorMessage) {
            response.response.data.errors.forEach(error =>
               setFieldError(error.field, error.error)
            );
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
          <PageCreateDialogHeader
            id={id}
            pageForEdit={pageForEdit}
            loading={loading}
         />
         <PageCreateForm
            savePage={savePage}
            actionsLoading={loading}
            page={pageForEdit || pagesUIProps.initUser}
            onHide={onHide}
         /> 
      </Modal>
   );
}

export default PageCreatModal;
