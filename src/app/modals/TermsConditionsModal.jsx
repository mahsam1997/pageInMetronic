import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import { getTerms } from "../services/terms.service";

const TermsConditionsModal = ({ show, handleClose }) => {
   const [terms, setTerms] = useState({
      title: "",
      content: "",
   });
   const [loading, setLoading] = useState(false);

   const { t, i18n } = useTranslation();
   const language = i18n.language;

   useEffect(() => {
      const getTermsAsync = async () => {
         setLoading(true);
         const response = await getTerms(language);
         if (response?.data?.data[0]) {
            const termsData = response?.data?.data[0];
            setLoading(false);
            setTerms({
               title: termsData.title,
               content: termsData.content,
            });
         }
      };

      getTermsAsync();
   }, [language]);

   return (
      <Modal show={show} onHide={handleClose}>
         <Modal.Header>{terms.title}</Modal.Header>
         <Modal.Body>
            {loading && (
               <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success" />
               </div>
            )}
            {terms.content}
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
               {t("messages.AUTH.GENERAL.CLOSE")}
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default TermsConditionsModal;
