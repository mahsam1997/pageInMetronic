import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

import TermsConditionsModal from "../modals/TermsConditionsModal";

import routes from "../router/routes.json";

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
               <a href={routes.CONTACT}>
                  <FormattedMessage id="AUTH.GENERAL.CONTACT" />
               </a>
            </span>
            <span className="text-muted">
               <a href={routes.PLANS}>
                  <FormattedMessage id="AUTH.GENERAL.PLANS" />
               </a>
            </span>
            <span className="text-muted">
               <a href={routes.RULES} onClick={handleShowTermsConditions}>
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
