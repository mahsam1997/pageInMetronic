import * as Yup from "yup";

const registerSchema = formatMessage => {
   return Yup.object().shape({
      fullName: Yup.string()
         .min(
            3,
            formatMessage("MIN_X_CHARACTERS", {
               x: 3,
               noun: formatMessage("AUTH.INPUT.FULLNAME"),
            })
         )
         .max(
            50,
            formatMessage("MAX_X_CHARACTERS", {
               x: 50,
               noun: formatMessage("AUTH.INPUT.FULLNAME"),
            })
         )
         .required(formatMessage("AUTH.VALIDATION.REQUIRED_FIELD")),

      phoneNumber: Yup.string()
         .min(
            3,
            formatMessage("MIN_X_CHARACTERS", {
               x: 3,
               noun: formatMessage("AUTH.INPUT.PHONE"),
            })
         )
         .max(
            50,
            formatMessage("MAX_X_CHARACTERS", {
               x: 50,
               noun: formatMessage("AUTH.INPUT.PHONE"),
            })
         )
         .required(formatMessage("AUTH.VALIDATION.REQUIRED_FIELD")),

      subPhoneNumber: Yup.number().required(
         formatMessage("AUTH.VALIDATION.REQUIRED_FIELD")
      ),

      email: Yup.string()
         .email(formatMessage("AUTH.VALIDATION.EMAIL"))
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

      password: Yup.string()
         .min(
            6,
            formatMessage("MIN_X_CHARACTERS", {
               x: 6,
               noun: formatMessage("AUTH.INPUT.PASSWORD"),
            })
         )
         .max(
            50,
            formatMessage("MAX_X_CHARACTERS", {
               x: 50,
               noun: formatMessage("AUTH.INPUT.PASSWORD"),
            })
         )
         .required(formatMessage("AUTH.VALIDATION.REQUIRED_FIELD")),

      acceptTerms: Yup.bool().required(
         formatMessage("AUTH.VALIDATION.AGREEMENT_REQUIRED")
      ),
   });
};

export default registerSchema;
