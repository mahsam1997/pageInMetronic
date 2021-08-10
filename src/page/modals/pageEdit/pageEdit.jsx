import React, { useEffect, useMemo, useState } from "react";
// import { Modal } from "react-bootstrap";
import showToast from "../../utils/showToast";
import { useTranslation } from "react-i18next";
import PageEditDialogHeader from "./pageEditHeader";
import PageEditForm from "./pageEditForm";
import { usePageListUIContext } from "../../context/pageListUiContex";

import { getPage, editPage } from "../../services/pages.service";
import { Card } from "@material-ui/core";

const pageForEditInitialValue = {
   title: "",
   status: "",
   key: "",
   language: "",
   content: "",
};

function PageEdit({ id, show, onHide }) {
   console.log("component render editesss");
   const [pageForEdit, setPageForEdit] = useState(pageForEditInitialValue);
   const [loading, setLoading] = useState(false);
   const { t } = useTranslation();

   const pageListUIContext = usePageListUIContext();
   const pagesUIProps = useMemo(() => {
      return {
         initPage: pageListUIContext.initPage,
         setIsModalClose: pageListUIContext.setIsModalClose,
      };
   }, [pageListUIContext]);

   useEffect(() => {
      console.log("pageedit");
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
   const savePage = async (page, setFieldError) => {
      const newPage = {
         title: page.title,
         status: page.status,
         key: page.key,
         language: page.language,
         content: page.content,
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
               text: "صفحه به درستی ویرایش شد",
            });
         } else if (response?.errorMessage) {
            response.response.data.errors.forEach(error =>
               setFieldError(error.field, error.error)
            );
         }
      }
   };
   if (show)
      return (
         <>
            <Card
            >
               <PageEditDialogHeader
                  id={id}
                  pageForEdit={pageForEdit}
                  loading={loading}
               /> 
               <PageEditForm
                  savePage={savePage}
                  actionsLoading={loading}
                  page={pageForEdit || pagesUIProps.initPage}
                  onHide={onHide}
               />
             </Card> 
         </>
      );
   else return <></>;
}

export default PageEdit;
