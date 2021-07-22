import * as Yup from "yup";
import i18next from "i18next";

import translator from "../../../../utils/translator";

const loginSchema = formatMessage => {
   console.log(
      translator("errors.MIN_X_CHARACTERS", {
         x: 3,
         noun: translator("messages.AUTH.INPUT.EMAIL"),
      })
   );

   return Yup.object().shape({
      email: Yup.string()
         // .email(formatMessage("errors.AUTH.VALIDATION.EMAIL"))
         .min(
            3,
            i18next.t("errors.MIN_X_CHARACTERS", {
               x: 3,
               noun: i18next.t("messages.AUTH.INPUT.EMAIL"),
            })
         )
         .max(
            50,
            formatMessage("MAX_X_CHARACTERS", {
               x: 50,
               noun: formatMessage("AUTH.INPUT.EMAIL"),
            })
         )
         .required(formatMessage("AUTH.VALIDATION.REQUIRED_FIELD")),
      password: Yup.string()
         .min(
            3,
            formatMessage("MIN_X_CHARACTERS", {
               x: 3,
               noun: formatMessage("AUTH.INPUT.EMAIL"),
            })
         )
         .max(
            50,
            formatMessage("MAX_X_CHARACTERS", {
               x: 50,
               noun: formatMessage("AUTH.INPUT.EMAIL"),
            })
         )
         .required(formatMessage("AUTH.VALIDATION.REQUIRED_FIELD")),
   });
};

export default loginSchema;
