import React from "react";
import { Modal, Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";

const TermsConditionsModal = ({ show, handleClose }) => {
   return (
      <Modal show={show} onHide={handleClose}>
         <Modal.Header>
            <FormattedMessage id="AUTH.GENERAL.TERMS_AND_CONDITIONS" />
         </Modal.Header>
         <Modal.Body>
            <FormattedMessage id="AUTH.GENERAL.TERMS_AND_CONDITIONS_THIS_SITE" />
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
