import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import * as Yup from "yup";
import { FormattedMessage, injectIntl } from "react-intl";
import * as auth from "../_redux/authRedux";
import { requestPassword } from "../_redux/authCrud";
import routes from "../../../router/routes.json";

const initialValues = {
   email: "",
};

function ForgotPassword(props) {
   const { intl } = props;
   const [isRequested, setIsRequested] = useState(false);
   const ForgotPasswordSchema = Yup.object().shape({
      email: Yup.string()
         .email(
            intl.formatMessage({
               id: "AUTH.VALIDATION.EMAIL",
            })
         )
         .min(
            3,
            intl.formatMessage({
               id: "AUTH.VALIDATION.MIN_LENGTH_FIELD",
            })
         )
         .max(
            50,
            intl.formatMessage({
               id: "AUTH.VALIDATION.MAX_LENGTH_FIELD",
            })
         )
         .required(
            intl.formatMessage({
               id: "AUTH.VALIDATION.REQUIRED_FIELD",
            })
         ),
   });

   const getInputClasses = fieldname => {
      if (formik.touched[fieldname] && formik.errors[fieldname]) {
         return "is-invalid";
      }

      if (formik.touched[fieldname] && !formik.errors[fieldname]) {
         return "is-valid";
      }

      return "";
   };

   const formik = useFormik({
      initialValues,
      validationSchema: ForgotPasswordSchema,
      onSubmit: (values, { setStatus, setSubmitting }) => {
         requestPassword(values.email)
            .then(() => setIsRequested(true))
            .catch(() => {
               setIsRequested(false);
               setSubmitting(false);
               setStatus(
                  intl.formatMessage(
                     { id: "AUTH.VALIDATION.NOT_FOUND" },
                     { name: values.email }
                  )
               );
            });
      },
   });

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
               <form
                  onSubmit={formik.handleSubmit}
                  className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
               >
                  {formik.status && (
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
                     <input
                        type="email"
                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                           "email"
                        )}`}
                        placeholder={intl.formatMessage({
                           id: "AUTH.INPUT.EMAIL.PLACE",
                        })}
                        name="email"
                        id="email"
                        {...formik.getFieldProps("email")}
                     />
                     {formik.touched.email && formik.errors.email ? (
                        <div className="fv-plugins-message-container">
                           <div className="fv-help-block">
                              {formik.errors.email}
                           </div>
                        </div>
                     ) : null}
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
               </form>
            </div>
         )}
      </>
   );
}

export default injectIntl(connect(null, auth.actions)(ForgotPassword));
