import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import TermsConditionsModal from "../modals/TermsConditionsModal";

import routes from "../router/routes.json";

const AuthFooter = () => {
   const [showTerms, setShowTerms] = useState(false);

   const { t } = useTranslation();

   const handleShowTermsConditions = e => {
      e.preventDefault();
      toggleTermsConditions();
   };

   const toggleTermsConditions = () => setShowTerms(prevState => !prevState);

   return (
      <div className="auth-footer">
         <div>
            <span className="text-muted">
               <a href={routes.CONTACT}>{t("messages.AUTH.GENERAL.CONTACT")}</a>
            </span>
            <span className="text-muted">
               <a href={routes.PLANS}>{t("messages.AUTH.GENERAL.PLANS")}</a>
            </span>
            <span className="text-muted">
               <a href={routes.RULES} onClick={handleShowTermsConditions}>
                  {t("messages.AUTH.GENERAL.RULES")}
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
