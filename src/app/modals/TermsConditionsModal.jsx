import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { FormattedMessage, useIntl } from "react-intl";

import { getTerms } from "../services/terms.service";

const TermsConditionsModal = ({ show, handleClose }) => {
   const language = useIntl().locale;

   const [terms, setTerms] = useState({
      title: "",
      content: "",
   });
   const [loading, setLoading] = useState(false);

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
               <FormattedMessage id="AUTH.GENERAL.CLOSE" />
            </Button>
         </Modal.Footer>
      </Modal>
   );
};

export default TermsConditionsModal;
