import * as Yup from "yup";

const loginSchema = t => {
   return Yup.object().shape({
      email: Yup.string()
         .email(t("errors.AUTH.VALIDATION.EMAIL"))
         .min(
            3,
            t("errors.MIN_X_CHARACTERS", {
               x: 3,
               noun: t("messages.AUTH.INPUT.EMAIL"),
            })
         )
         .max(
            50,
            t("errors.MAX_X_CHARACTERS", {
               x: 50,
               noun: t("messages.AUTH.INPUT.EMAIL"),
            })
         )
         .required(t("messages.AUTH.VALIDATION.REQUIRED_FIELD")),
      password: Yup.string()
         .min(
            6,
            t("errors.MIN_X_CHARACTERS", {
               x: 6,
               noun: t("messages.AUTH.INPUT.PASSWORD"),
            })
         )
         .max(
            50,
            t("errors.MAX_X_CHARACTERS", {
               x: 50,
               noun: t("messages.AUTH.INPUT.EMAIL"),
            })
         )
         .required(t("errors.AUTH.VALIDATION.REQUIRED_FIELD")),
   });
};

export default loginSchema;
