import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";

import { Checkbox } from "../../../../../_metronic/_partials/controls/forms/Checkbox";

// components
import TextError from "../../../../components/common/TextError";

// context
import { AuthenticationContext } from "../../../../context/AuthenticationContext";

// hooks
import { useTranslation } from "react-i18next";
// service
import { login } from "../../../../services/auth.service";

// utils
import getInputClasses from "../../../../utils/getInputClasses";
import { setAuthenticate } from "../../../../utils/authenticate";

import loginSchema from "./loginSchema";
import routes from "../../../../router/routes.json";
import googleLogo from "../../../../Assets/images/google-logo-removebg.png";
import i18next from "i18next";
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

   const { t } = useTranslation();
   const { setIsAuth } = useContext(AuthenticationContext);

   const onSubmit = async values => {
      const { data } = await login(values);
      if (data?.success) {
         const { id, refresh, role, token } = data.data;
         setAuthenticate(id, refresh, role, token);
         setIsAuth(true);
      }
   };

   console.log("login log");

   console.log(
      "translator login file",
      i18next.t("errors.AUTH.VALIDATION.EMAIL")
   );

   return (
      <div className="login-form login-signin" id="kt_login_signin_form">
         {/* begin::Head */}
         <div className=" mb-10 mb-lg-10 login-title">
            <h3 className="font-size-h1 ">{t("messages.AUTH.LOGIN.TITLE")}</h3>
            <p className="text-muted ">
               {t("messages.AUTH.GENERAL.NO_ACCOUNT")}
               <Link to={routes.REGISTER}>
                  {t("messages.AUTH.LOGIN.NEW_ACCOUNT")}
               </Link>
            </p>
         </div>
         {/* end::Head */}

         {/*begin::Form*/}

         <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={loginSchema(t)}
         >
            {formik => {
               return (
                  <Form className="form fv-plugins-bootstrap fv-plugins-framework">
                     <div className="form-group fv-plugins-icon-container">
                        <label>
                           {/* <FormattedMessage id="AUTH.INPUT.EMAIL" /> */}
                           {t("messages.AUTH.INPUT.EMAIL")}
                        </label>
                        <Field
                           placeholder={t("messages.AUTH.INPUT.EMAIL.PLACE")}
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
                        <label>{t("messages.AUTH.INPUT.PASSWORD")}</label>
                        <div className="input-group">
                           <Field
                              placeholder={t(
                                 "messages.AUTH.INPUT.PASSWORD.PLACE"
                              )}
                              type={showPassword ? "text" : "password"}
                              className={`password-input form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
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
                        {t("messages.AUTH.GENERAL.FORGOT_BUTTON")}
                     </Link>
                     <br />
                     <br />
                     <div className="d-flex align-items-baseline">
                        <Checkbox id="remember-me">
                           {t("messages.AUTH.LABEL.REMEMBER.ME")}
                        </Checkbox>
                     </div>
                     <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
                        <button
                           id="kt_login_signin_submit"
                           type="submit"
                           disabled={formik.isSubmitting}
                           className={`btn btn-primary font-weight-bold px-9 py-4 my-3 fullWidth`}
                        >
                           <span>{t("messages.AUTH.LOGIN.BUTTON")}</span>
                        </button>
                        <button
                           type="button"
                           className={`btn font-weight-bold px-9 py-4 my-3 login-with-google fullWidth`}
                        >
                           <img src={googleLogo} alt="google logo" />
                           <span>{t("messages.AUTH.LOGIN.GOOGLE")}</span>
                        </button>
                     </div>
                  </Form>
               );
            }}
         </Formik>

         {/*end::Form*/}
         <div className="login-bottom">
            <ul>
               <li className="text-muted">
                  <a href="/contact">{t("messages.AUTH.GENERAL.CONTACT")}</a>
               </li>
               <li className="text-muted">
                  <a href="/plans">{t("messages.AUTH.GENERAL.PLANS")}</a>
               </li>
               <li className="text-muted">
                  <a href="/rules">{t("messages.AUTH.GENERAL.RULES")}</a>
               </li>
            </ul>
         </div>
      </div>
   );
}

export default Login;
