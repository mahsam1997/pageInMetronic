import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { FormattedMessage, useIntl } from "react-intl";

import { Checkbox } from "../../../../../_metronic/_partials/controls/forms/Checkbox";

// components
import TextError from "../../../../components/common/TextError";
import { LanguageSelectorDropdown } from "../../../../../_metronic/layout/components/extras/dropdowns/LanguageSelectorDropdown";

import CustomButton from "../../../../components/common/CustomButton";
// context
import { AuthenticationContext } from "../../../../context/AuthenticationContext";

// hooks
import useFormatMessage from "../../../../hooks/useFormatMessage";

// service
import { login } from "../../../../services/auth.service";

// utils
import formatMessage from "../../../../utils/formatMessage";
import getInputClasses from "../../../../utils/getInputClasses";
import { setAuthenticate } from "../../../../utils/authenticate";

import schema from "./loginSchema";
import routes from "../../../../router/routes.json";
import googleLogo from "../../../../Assets/images/google-logo-removebg.png";

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
   email: "",
   password: "",
};

function Login(props) {
   const [showPassword, setShowPassword] = useState(false);

   const intl = useIntl();
   const isEnglish = intl.locale === "en";
   const placement = isEnglish ? "right" : "left";

   const { setIsAuth } = useContext(AuthenticationContext);

   const loginSchema = schema(useFormatMessage);

   const onSubmit = async (values, { setFieldError }) => {
      const response = await login(values);
      if (response?.data?.success) {
         const { id, refresh, role, token } = response.data.data;
         setAuthenticate(id, refresh, role, token);
         setIsAuth(true);
      } else if (response?.errorMessage) {
         response.response.data.errors.forEach(error =>
            setFieldError(error.field, error.error)
         );
      }
   };

   return (
      <div className="login-form login-signin" id="kt_login_signin_form">
         {/* begin::Head */}
         <div className=" mb-10 mb-lg-10 login-title">
            <h3>
               <FormattedMessage id="AUTH.LOGIN.TITLE" />
            </h3>
            <p className="text-muted ">
               <FormattedMessage id="AUTH.GENERAL.NO_ACCOUNT" />
               <Link to={routes.REGISTER}>
                  <FormattedMessage id="AUTH.LOGIN.NEW_ACCOUNT" />
               </Link>
            </p>
         </div>
         {/* end::Head */}

         <LanguageSelectorDropdown
            overlayPlacement={placement}
            alignRight={!isEnglish}
         />

         <br />

         {/*begin::Form*/}

         <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={loginSchema}
         >
            {formik => {
               return (
                  <Form
                     noValidate="noValidate"
                     className="form fv-plugins-bootstrap fv-plugins-framework"
                  >
                     <div className="form-group fv-plugins-icon-container">
                        <label>
                           <FormattedMessage id="AUTH.INPUT.EMAIL" />
                        </label>
                        <Field
                           placeholder={formatMessage(
                              intl,
                              "AUTH.INPUT.EMAIL.PLACE"
                           )}
                           type="email"
                           className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                              formik,
                              "email"
                           )}`}
                           name="email"
                        />
                        <ErrorMessage name="email" children={TextError} />
                     </div>
                     <div className="form-group fv-plugins-icon-container">
                        <label>
                           <FormattedMessage id="AUTH.INPUT.PASSWORD" />
                        </label>
                        <div className="input-group">
                           <Field
                              placeholder={formatMessage(
                                 intl,
                                 "AUTH.INPUT.PASSWORD.PLACE"
                              )}
                              type={showPassword ? "text" : "password"}
                              className={`form-control form-control-solid h-auto py-5 px-6 password-input ${getInputClasses(
                                 formik,
                                 "password"
                              )}`}
                              name="password"
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
                        <ErrorMessage name="password" children={TextError} />
                     </div>
                     <Link
                        to={routes.FORGETPASS}
                        // className="text-dark-50 text-hover-primary my-3 mr-2"
                        className="forget-pass"
                        // id="kt_login_forgot"
                     >
                        <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" />
                     </Link>
                     <br />
                     <br />
                     <div className="d-flex align-items-baseline">
                        <Checkbox id="remember-me">
                           <FormattedMessage id="AUTH.LABEL.REMEMBER.ME" />
                        </Checkbox>
                     </div>
                     <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
                        <CustomButton
                           type="submit"
                           id="kt_login_signin_submit"
                           disabled={formik.isSubmitting}
                           tagName="span"
                           title="AUTH.LOGIN.BUTTON"
                           classNames="btn btn-primary font-weight-bold px-9 py-4 my-3 fullWidth"
                        />
                        <CustomButton
                           title="AUTH.LOGIN.GOOGLE"
                           tagName="span"
                           classNames="btn font-weight-bold px-9 py-4 my-3 login-with-google fullWidth"
                        >
                           <img src={googleLogo} alt="google logo" />
                        </CustomButton>
                     </div>
                  </Form>
               );
            }}
         </Formik>

         {/*end::Form*/}
      </div>
   );
}

export default Login;
