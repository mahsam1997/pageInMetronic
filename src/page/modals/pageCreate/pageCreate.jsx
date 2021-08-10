import React, { useEffect, useMemo, useState } from "react";
// import { Modal } from "react-bootstrap";
import showToast from "../../utils/showToast";
import { useTranslation } from "react-i18next";
import PageCreateForm from "./pageCreateForm";
import { usePageListUIContext } from "../../context/pageListUiContex";
import { addPage } from "../../services/pages.service";
import { Card } from "@material-ui/core";

const pageForCreateInitialValue = {
   title: "",
   status: "",
   key: "",
   language: "",
   content: "",
};

function PageCreate({id, show, onHide }) {
    const [pageForEdit, setPageForCreate] = useState(pageForCreateInitialValue);
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
       
         setPageForCreate(pageForCreateInitialValue);
         pagesUIProps.setIsModalClose(prevState => !prevState);
      

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);
   //    console.log("pageedit");
   //    // server call for getting page by id
   //    const receivePage = async () => {
   //       const response = await getPage();
   //       if (response?.data?.success) {
   //          setPageForCreate(response.data.data);
   //       }
   //    };
   //    if (id) {
   //       receivePage();
   //    }

   //    return () => {
   //       setPageForCreate(pageForCreateInitialValue);
   //       pagesUIProps.setIsModalClose(prevState => !prevState);
   //    };

   //    // eslint-disable-next-line react-hooks/exhaustive-deps
   // }, [id]);

   // server request for saving user
   const addPage = async (page, setFieldError) => {
      const newPage = {
         title: page.title,
         status: page.status,
         key: page.key,
         language: page.language,
         content: page.content,
      };

      // if (!id) {
      // //    // server request for creating user
      // } else {
      // //    // server request for updating customer
      // setLoading(true);
      const response = await addPage(newPage);
      // setLoading(false);
      if (response?.data?.success) {
         // onHide();
         showToast({
            text: "صفحه به درستی اضافه شد",
         });
      } else if (response?.errorMessage) {
         response.response.data.errors.forEach(error =>
            setFieldError(error.field, error.error)
         );
      }
    };
   if (show)
      return (
         <>
            <Card>
               <PageCreateForm
                  addPage={addPage}
                   actionsLoading={loading}
                  page={pageForEdit || pagesUIProps.initPage}
                  onHide={onHide}
               />
            </Card>
         </>
      );
   else return <></>;
}

export default PageCreate;
