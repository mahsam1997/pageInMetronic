import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

import TermsConditionsModal from "../modals/TermsConditionsModal";

const AuthFooter = () => {
   const [showTerms, setShowTerms] = useState(false);

   const handleShowTermsConditions = e => {
      e.preventDefault();
      toggleTermsConditions();
   };

   const toggleTermsConditions = () => setShowTerms(prevState => !prevState);

   return (
      <div className="auth-footer">
         <div>
            <span className="text-muted">
               <a href="/contact">
                  <FormattedMessage id="AUTH.GENERAL.CONTACT" />
               </a>
            </span>
            <span className="text-muted">
               <a href="/plans">
                  <FormattedMessage id="AUTH.GENERAL.PLANS" />
               </a>
            </span>
            <span className="text-muted">
               <a href="/rules" onClick={handleShowTermsConditions}>
                  <FormattedMessage id="AUTH.GENERAL.RULES" />
               </a>
            </span>
         </div>

         {showTerms && (
            <TermsConditionsModal
               show={showTerms}
               handleClose={toggleTermsConditions}
            />
         )}
      </div>
   );
};

export default AuthFooter;
