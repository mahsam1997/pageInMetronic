import React from "react";

const inputLabel = ({ label, touched, error, customFeedbackLabel }) => {
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

const selectLabel = ({ label, touched, error, customFeedbackLabel }) => {
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
   switch (type) {
      case "text":
      case "email":
      case "password":
      case "number":
         return inputLabel({ label, touched, error, customFeedbackLabel });
      default:
         return selectLabel({ label, touched, error, customFeedbackLabel });
   }
}
