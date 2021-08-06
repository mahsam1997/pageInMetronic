import React from "react";
import { useField } from "formik";
import { FieldFeedbackLabel } from "./FieldFeedbackLabel";

import { useTranslation } from "react-i18next";

const getFieldCSSClasses = (touched, errors) => {
   const classes = ["form-control", "form-control-solid"];
   if (touched && errors) {
      classes.push("is-invalid-select");
   }

   if (touched && !errors) {
      classes.push("is-valid-select");
   }

   return classes.join(" ");
};

export function Select({
   label,
   withFeedbackLabel = true,
   type = "text",
   customFeedbackLabel,
   children,
   ...props
}) {
   const [field, meta] = useField(props);
   const { touched, error } = meta;

   const { t } = useTranslation();

   return (
      <>
         {label && (
            <label>
               {t("DEFAULT.SELECT")} {label}
            </label>
         )}
         <select
            className={getFieldCSSClasses(touched, error)}
            {...field}
            {...props}
         >
            {children}
         </select>
         {withFeedbackLabel && (
            <FieldFeedbackLabel
               error={error}
               touched={touched}
               label={label}
               customFeedbackLabel={customFeedbackLabel}
            />
         )}
      </>
   );
}
