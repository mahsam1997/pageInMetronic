import React, { useState } from "react";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { FormattedMessage, useIntl } from "react-intl";
import routes from "../../../router/routes.json";

// components
import TextError from "../../../components/common/TextError";

// hooks
import useFormatMessage from "../../../hooks/useFormatMessage";

// servise
import { forgotPassword } from "../../../services/auth.service";

// utils
import getInputClasses from "../../../utils/getInputClasses";
import formatMessage from "../../../utils/formatMessage";

const initialValues = {
   email: "",
};

function ForgotPassword(props) {
   const intl = useIntl();
   const [isRequested, setIsRequested] = useState(false);
   const forgotPasswordSchema = Yup.object().shape({
      email: Yup.string()
         .email(useFormatMessage("AUTH.VALIDATION.EMAIL"))
         .required(useFormatMessage("REQUIRED")),
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
                     <FormattedMessage id="AUTH.FORGOT.TITLE" />
                  </h3>
                  <div className="text-muted font-weight-bold">
                     <FormattedMessage id="AUTH.FORGOT.DESC" />
                  </div>
               </div>
               <Formik
                  initialValues={initialValues}
                  onSubmit={onSubmit}
                  validationSchema={forgotPasswordSchema}
               >
                  {formik => (
                     <Form className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp">
                        {formik?.status && (
                           <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                              <div className="alert-text font-weight-bold">
                                 {formik.status}
                              </div>
                           </div>
                        )}
                        <div className="form-group fv-plugins-icon-container">
                           <label htmlFor="email">
                              <FormattedMessage id="AUTH.INPUT.EMAIL" />
                           </label>
                           <Field
                              type="email"
                              className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                                 formik,
                                 "email"
                              )}`}
                              placeholder={formatMessage(
                                 intl,
                                 "AUTH.INPUT.EMAIL.PLACE"
                              )}
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
                              <FormattedMessage id="AUTH.FORGOT.SEND" />
                           </button>
                           <Link to={routes.AUTH}>
                              <button
                                 type="button"
                                 id="kt_login_forgot_cancel"
                                 className="btn btn-light-primary font-weight-bold px-13 py-3 my-3 mx-4"
                              >
                                 <FormattedMessage id="AUTH.GENERAL.CANCEL" />
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
