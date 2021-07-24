import React from "react";
import { useIntl } from "react-intl";

const inputLabel = (
   { label, touched, error, customFeedbackLabel },
   intl,
   isEnglish
) => {
   if (touched && error) {
      return <div className="invalid-feedback">{error}</div>;
   }

   if (touched && !error && label) {
      return <div className="valid-feedback"></div>;
   }

   return (
      <div className="feedback">
         {customFeedbackLabel && <>{customFeedbackLabel}</>}
      </div>
   );
};

const selectLabel = (
   { label, touched, error, customFeedbackLabel },
   intl,
   isEnglish
) => {
   if (touched && error) {
      return <div className="invalid-feedback">{error}</div>;
   }

   return (
      <div className="feedback">
         {customFeedbackLabel && <>{customFeedbackLabel}</>}
      </div>
   );
};

export function FieldFeedbackLabel({
   label,
   touched,
   error,
   type,
   customFeedbackLabel,
}) {
   const intl = useIntl();
   const isEnglish = intl.locale === "en";

   switch (type) {
      case "text":
      case "email":
      case "password":
      case "number":
         return inputLabel(
            { label, touched, error, customFeedbackLabel },
            intl,
            isEnglish
         );
      default:
         return selectLabel(
            { label, touched, error, customFeedbackLabel },
            intl,
            isEnglish
         );
   }
}
