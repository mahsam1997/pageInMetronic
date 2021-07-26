import * as Yup from "yup";

const registerSchema = t => {
   return Yup.object().shape({
      fullName: Yup.string()
         .min(
            3,
            t("errors.MIN_X_CHARACTERS", {
               x: 3,
               noun: t("messages.AUTH.INPUT.FULLNAME"),
            })
         )
         .max(
            50,
            t("errors.MAX_X_CHARACTERS", {
               x: 50,
               noun: t("messages.AUTH.INPUT.FULLNAME"),
            })
         )
         .required(t("errors.REQUIRED")),

      phoneNumber: Yup.string()
         .min(
            10,
            t("errors.MIN_X_CHARACTERS", {
               x: 10,
               noun: t("messages.AUTH.INPUT.PHONE"),
            })
         )
         .max(
            10,
            t("errors.MAX_X_CHARACTERS", {
               x: 10,
               noun: t("messages.AUTH.INPUT.PHONE"),
            })
         )
         .required(t("errors.REQUIRED")),

      countryCode: Yup.string().required(t("errors.REQUIRED")),

      subPhoneNumber: Yup.number().required(t("errors.REQUIRED")),
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
         .required(t("errors.REQUIRED")),

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
               noun: t("messages.AUTH.INPUT.PASSWORD"),
            })
         )
         .required(t("errors.REQUIRED")),

      acceptTerms: Yup.bool().required(t("errors.REQUIRED")),
   });
};

export default registerSchema;
