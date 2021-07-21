import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { FormattedMessage, useIntl } from "react-intl";

import { Checkbox } from "../../../../../_metronic/_partials/controls/forms/Checkbox";

// components
import TextError from "../../../../components/common/TextError";

// context
import { AuthenticationContext } from "../../../../context/AuthenticationContext";

// hooks
import useFormatMessage from "../../../../hooks/useFormatMessage";
import { useTranslation } from "react-i18next";
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
   const { t } = useTranslation();
   const { setIsAuth } = useContext(AuthenticationContext);

   const loginSchema = schema(useFormatMessage);

   const onSubmit = async (values, { setSubmitting }) => {
      const { data } = await login(values);
      if (data?.success) {
         const { id, refresh, role, token } = data.data;
         setAuthenticate(id, refresh, role, token);
         setIsAuth(true);
      }
   };

   return (
      <div className="login-form login-signin" id="kt_login_signin_form">
         {/* begin::Head */}
         <div className=" mb-10 mb-lg-10 login-title">
            <h3 className="font-size-h1 ">
               {/* <FormattedMessage id="AUTH.LOGIN.TITLE" /> */}
               {t("AUTH.LOGIN.TITLE")}
            </h3>
            <p className="text-muted ">
               {/* <FormattedMessage id="AUTH.GENERAL.NO_ACCOUNT" /> */}
               {t("AUTH.GENERAL.NO_ACCOUNT")}
               <Link to={routes.REGISTER}>
                  {/* <FormattedMessage id="AUTH.LOGIN.NEW_ACCOUNT" /> */}
                  {t("AUTH.LOGIN.NEW_ACCOUNT")}
               </Link>
            </p>
         </div>
         {/* end::Head */}

         {/*begin::Form*/}

         <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={loginSchema}
         >
            {formik => {
               return (
                  <Form className="form fv-plugins-bootstrap fv-plugins-framework">
                     <div className="form-group fv-plugins-icon-container">
                        <label>
                           {/* <FormattedMessage id="AUTH.INPUT.EMAIL" /> */}
                           {t("AUTH.INPUT.EMAIL")}
                        </label>
                        <Field
                           // placeholder={formatMessage(
                           //    intl,
                           //    "AUTH.INPUT.EMAIL.PLACE"
                           // )}
                           placeholder={t("AUTH.INPUT.EMAIL.PLACE")}
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
                           {/* <FormattedMessage id="AUTH.INPUT.PASSWORD" /> */}
                           {t("AUTH.INPUT.PASSWORD")}
                        </label>
                        <div className="input-group">
                           <Field
                              // placeholder={formatMessage(
                              //    intl,
                              //    "AUTH.INPUT.PASSWORD.PLACE"
                              // )}
                              placeholder={t("AUTH.INPUT.PASSWORD.PLACE")}
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
                        {/* <FormattedMessage id="AUTH.GENERAL.FORGOT_BUTTON" /> */}
                        {t("AUTH.GENERAL.FORGOT_BUTTON")}
                     </Link>
                     <br />
                     <br />
                     <div className="d-flex align-items-baseline">
                        <Checkbox id="remember-me">
                           {/* <FormattedMessage id="AUTH.LABEL.REMEMBER.ME" /> */}
                           {t("AUTH.LABEL.REMEMBER.ME")}
                        </Checkbox>
                     </div>
                     <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
                        <button
                           id="kt_login_signin_submit"
                           type="submit"
                           disabled={formik.isSubmitting}
                           className={`btn btn-primary font-weight-bold px-9 py-4 my-3 fullWidth`}
                        >
                           {/* <FormattedMessage
                              id="AUTH.LOGIN.BUTTON"
                              tagName="span"
                           /> */}
                           <span>{t("AUTH.LOGIN.BUTTON")}</span>
                        </button>
                        <button
                           type="button"
                           className={`btn font-weight-bold px-9 py-4 my-3 login-with-google fullWidth`}
                        >
                           <img src={googleLogo} alt="google logo" />
                           {/* <FormattedMessage
                              id="AUTH.LOGIN.GOOGLE"
                              tagName="span"
                           /> */}
                           <span>{t("AUTH.LOGIN.GOOGLE")}</span>
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
                  <a href="/contact">
                     {/* <FormattedMessage id="AUTH.GENERAL.CONTACT" /> */}
                     {t("AUTH.GENERAL.CONTACT")}
                  </a>
               </li>
               <li className="text-muted">
                  <a href="/plans">
                     {/* <FormattedMessage id="AUTH.GENERAL.PLANS" /> */}
                     {t("AUTH.GENERAL.PLANS")}
                  </a>
               </li>
               <li className="text-muted">
                  <a href="/rules">
                     {/* <FormattedMessage id="AUTH.GENERAL.RULES" /> */}
                     {t("AUTH.GENERAL.PLANS")}
                  </a>
               </li>
            </ul>
         </div>
      </div>
   );
}

export default Login;
