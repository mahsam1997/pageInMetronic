import * as Yup from "yup";

const loginSchema = formatMessage => {
   return Yup.object().shape({
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
