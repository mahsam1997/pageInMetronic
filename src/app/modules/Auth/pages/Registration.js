import React, { useState } from "react";
import { useFormik } from "formik";
import { connect } from "react-redux";
import * as Yup from "yup";
import { FormattedMessage, injectIntl } from "react-intl";
import Select from "react-select";

import * as auth from "../_redux/authRedux";
import { register } from "../_redux/authCrud";
import { Checkbox } from "../../../../_metronic/_partials/controls/forms/Checkbox";
import googleLogo from "../../../Assets/images/google-logo-removebg.png";

const initialValues = {
   fullName: "",
   email: "",
   username: "",
   password: "",
   changePassword: "",
   acceptTerms: false,
};

function Registration(props) {
   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);

   const { intl } = props;

   const RegistrationSchema = Yup.object().shape({
      fullName: Yup.string()
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
      username: Yup.string()
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
      password: Yup.string()
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
      changePassword: Yup.string()
         .required(
            intl.formatMessage({
               id: "AUTH.VALIDATION.REQUIRED_FIELD",
            })
         )
         .when("password", {
            is: val => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
               [Yup.ref("password")],
               intl.formatMessage({
                  id: "AUTH.VALIDATION.CONFIRM_PASS",
               })
            ),
         }),
      acceptTerms: Yup.bool().required(
         intl.formatMessage({
            id: "AUTH.VALIDATION.AGREEMENT_REQUIRED",
         })
      ),
   });

   const enableLoading = () => {
      setLoading(true);
   };

   const disableLoading = () => {
      setLoading(false);
   };

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
      validationSchema: RegistrationSchema,
      onSubmit: (values, { setStatus, setSubmitting }) => {
         setSubmitting(true);
         enableLoading();
         register(
            values.email,
            values.fullName,
            values.username,
            values.password
         )
            .then(({ data: { authToken } }) => {
               props.register(authToken);
               disableLoading();
               setSubmitting(false);
            })
            .catch(() => {
               setSubmitting(false);
               setStatus(
                  intl.formatMessage({
                     id: "AUTH.VALIDATION.INVALID_LOGIN",
                  })
               );
               disableLoading();
            });
      },
   });

   const options = [
      { value: 1, label: "+98" },
      { value: 2, label: "+99" },
      { value: 3, label: "+97" },
   ];

   const selectStyles = {
      control: styles => ({
         ...styles,
         backgroundColor: "#ffffff",
         width: "90px",
         padding: "7px 0",
         borderRadius: "12px",
         marginRight: "10px",
         border: "none",
         direction: "ltr",
         paddingLeft: 5,
         //  color: "#A7A8BB",
         fontStyle: "normal",
         fontWeight: 500,
         fontSize: "14px",
         lineHeight: "24px",
      }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
         return {
            ...styles,
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "24px",
            // color: "#A7A8BB",
         };
      },
      // input: styles => ({ ...styles, ...dot() }),
      // placeholder: styles => ({ ...styles, ...dot() }),
      // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
   };
   return (
      <div
         className="register login-form login-signin"
         style={{ display: "block" }}
      >
         <div className=" mb-5 mb-lg-10">
            <h3 className="font-size-h1">
               <FormattedMessage id="AUTH.REGISTER.TITLE" />
            </h3>
            <p className="text-muted font-weight-bold">
               <FormattedMessage id="AUTH.REGISTER.DESC" />
            </p>
         </div>

         <form
            id="kt_login_signin_form"
            className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
            onSubmit={formik.handleSubmit}
         >
            {/* begin: Alert */}
            {formik.status && (
               <div className="mb-10 alert alert-custom alert-light-danger alert-dismissible">
                  <div className="alert-text font-weight-bold">
                     {formik.status}
                  </div>
               </div>
            )}
            {/* end: Alert */}

            {/* begin: Fullname */}
            <div className="form-group fv-plugins-icon-container">
               <label htmlFor="fullName">
                  <FormattedMessage id="AUTH.INPUT.FULLNAME" />
               </label>
               <input
                  placeholder={intl.formatMessage({
                     id: "AUTH.INPUT.FULLNAME.PLACE",
                  })}
                  type="text"
                  className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                     "fullName"
                  )}`}
                  name="fullName"
                  id="fullName"
                  {...formik.getFieldProps("fullName")}
               />
               {formik.touched.fullName && formik.errors.fullName ? (
                  <div className="fv-plugins-message-container">
                     <div className="fv-help-block">
                        {formik.errors.fullName}
                     </div>
                  </div>
               ) : null}
            </div>
            {/* end: Fullname */}

            {/* begin: Phone Number */}
            <div className="form-group fv-plugins-icon-container">
               <label>
                  <FormattedMessage id="AUTH.INPUT.PHONE" />
               </label>
               <div className="d-flex">
                  <div style={{ width: "80%" }}>
                     <input
                        placeholder={intl.formatMessage({
                           id: "AUTH.INPUT.PHONE.PLACE",
                        })}
                        type="text"
                        className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                           "fullName"
                        )}`}
                        name="fullName"
                        {...formik.getFieldProps("fullName")}
                     />
                     {formik.touched.fullName && formik.errors.fullName ? (
                        <div className="fv-plugins-message-container">
                           <div className="fv-help-block">
                              {formik.errors.fullName}
                           </div>
                        </div>
                     ) : null}
                  </div>
                  <Select
                     options={options}
                     defaultValue={options[0]}
                     styles={selectStyles}
                     components={{
                        IndicatorSeparator: () => null,
                     }}
                  />
               </div>
            </div>
            {/* end: Phone Number */}

            {/* begin: Email */}
            <div className="form-group fv-plugins-icon-container">
               <label htmlFor="email">
                  <FormattedMessage id="AUTH.INPUT.EMAIL" />
               </label>
               <input
                  placeholder={intl.formatMessage({
                     id: "AUTH.INPUT.EMAIL.PLACE",
                  })}
                  type="email"
                  className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                     "email"
                  )}`}
                  name="email"
                  id="email"
                  {...formik.getFieldProps("email")}
               />
               {formik.touched.email && formik.errors.email ? (
                  <div className="fv-plugins-message-container">
                     <div className="fv-help-block">{formik.errors.email}</div>
                  </div>
               ) : null}
            </div>
            {/* end: Email */}

            {/* begin: Password */}
            <div className="form-group fv-plugins-icon-container">
               <label htmlFor="password">
                  <FormattedMessage id="AUTH.INPUT.PASSWORD" />
               </label>
               <div className="input-group">
                  <input
                     placeholder={intl.formatMessage({
                        id: "AUTH.REGISTER.PASSWORD.PLACE",
                     })}
                     type={showPassword ? "text" : "password"}
                     className={`password-input form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                        "password"
                     )}`}
                     id="password"
                     name="password"
                     {...formik.getFieldProps("password")}
                  />
                  <span className="input-group-text showPass">
                     <i
                        className={`fas ${
                           showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                        onClick={e => setShowPassword(prev => !prev)}
                     />
                  </span>
               </div>
               {formik.touched.password && formik.errors.password ? (
                  <div className="fv-plugins-message-container">
                     <div className="fv-help-block">
                        {formik.errors.password}
                     </div>
                  </div>
               ) : null}
            </div>
            {/* end: Password */}

            <div className="d-flex align-items-baseline">
               <Checkbox id="accept-rules" />
               <label className="remember-me" htmlFor="accept-rules">
                  <FormattedMessage id="AUTH.GENERAL.ACCEPT.RULES" />
               </label>
            </div>

            <div className="form-group d-flex">
               <button
                  type="submit"
                  disabled={
                     formik.isSubmitting ||
                     !formik.isValid ||
                     !formik.values.acceptTerms
                  }
                  className="btn btn-primary font-weight-bold px-10 my-3 mx-4"
               >
                  <FormattedMessage
                     id="AUTH.GENERAL.REGISTER_BUTTON"
                     tagName="span"
                  />
                  {loading && (
                     <span className="ml-3 spinner spinner-white"></span>
                  )}
               </button>

               <button
                  type="button"
                  className="btn btn-light-primary font-weight-bold px-10  my-3 mx-4"
               >
                  <img src={googleLogo} alt="google logo" />
                  <FormattedMessage id="AUTH.LOGIN.GOOGLE" tagName="span" />
               </button>
            </div>
         </form>

         <div className="login-bottom justify-content-start">
            <ul>
               <li className="text-muted">
                  <a href="/contact">
                     <FormattedMessage id="AUTH.GENERAL.CONTACT" />
                  </a>
               </li>
               <li className="text-muted">
                  <a href="/plans">
                     <FormattedMessage id="AUTH.GENERAL.PLANS" />
                  </a>
               </li>
               <li className="text-muted">
                  <a href="/rules">
                     <FormattedMessage id="AUTH.GENERAL.RULES" />
                  </a>
               </li>
            </ul>
         </div>
      </div>
   );
}

export default injectIntl(connect(null, auth.actions)(Registration));
