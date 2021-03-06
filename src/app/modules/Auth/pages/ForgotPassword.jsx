import React, { useState } from "react";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import routes from "../../../router/routes.json";

// components
import TextError from "../../../components/common/TextError";

// hooks
import { useTranslation } from "react-i18next";
// servise
import { forgotPassword } from "../../../services/auth.service";

// utils
import getInputClasses from "../../../utils/getInputClasses";

const initialValues = {
   email: "",
};

function ForgotPassword(props) {
   const [isRequested, setIsRequested] = useState(false);

   const { t } = useTranslation();

   const forgotPasswordSchema = Yup.object().shape({
      email: Yup.string()
         .email(t("errors.AUTH.VALIDATION.EMAIL"))
         .required(t("errors.REQUIRED")),
   });

   const onSubmit = async values => {
      const { data } = await forgotPassword(values);
      if (data.success) setIsRequested(true);
   };

   return (
      <>
         {isRequested && <Redirect to={routes.AUTH} />}
         {!isRequested && (
            <div
               className="login-form login-forgot"
               style={{ display: "block" }}
            >
               <div className="mb-5 mb-lg-10">
                  <h3 className="font-size-h1">
                     {t("messages.AUTH.FORGOT.TITLE")}
                  </h3>
                  <div className="text-muted font-weight-bold">
                     {t("messages.AUTH.FORGOT.DESC")}
                  </div>
               </div>
               <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={forgotPasswordSchema}
               >
                  {formik => (
                     <Form
                        noValidate="noValidate"
                        className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
                     >
                        <div className="form-group fv-plugins-icon-container">
                           <label htmlFor="email">
                              {t("messages.AUTH.INPUT.EMAIL")}
                           </label>
                           <Field
                              type="email"
                              className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                                 formik,
                                 "email"
                              )}`}
                              placeholder={t("messages.AUTH.INPUT.EMAIL.PLACE")}
                              name="email"
                              id="email"
                           />
                           <ErrorMessage name="email" children={TextError} />
                        </div>
                        <div className="form-group d-flex ">
                           <button
                              id="kt_login_forgot_submit"
                              type="submit"
                              className="btn btn-primary font-weight-bold px-11 py-3 my-3"
                              disabled={formik.isSubmitting}
                           >
                              {t("messages.AUTH.FORGOT.SEND")}
                           </button>
                           <Link to={routes.AUTH}>
                              <button
                                 type="button"
                                 id="kt_login_forgot_cancel"
                                 className="btn btn-light-primary font-weight-bold px-13 py-3 my-3 mx-4"
                              >
                                 {t("messages.AUTH.GENERAL.CANCEL")}
                              </button>
                           </Link>
                        </div>
                     </Form>
                  )}
               </Formik>
            </div>
         )}
      </>
   );
}

export default ForgotPassword;
