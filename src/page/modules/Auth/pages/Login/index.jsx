import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, ErrorMessage, Field } from "formik";

import { Checkbox } from "../../../../../_metronic/_partials/controls/forms/Checkbox";

// components
import TextError from "../../../../components/common/TextError";
import { LanguageSelectorDropdown } from "../../../../../_metronic/layout/components/extras/dropdowns/LanguageSelectorDropdown";

import CustomButton from "../../../../components/common/CustomButton";
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

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
   email: "",
   password: "",
   rememberMe: false,
};

function Login(props) {
   const [showPassword, setShowPassword] = useState(false);

   const { t, i18n } = useTranslation();
   const { setIsAuth } = useContext(AuthenticationContext);
   const isLtrDirection = i18n.dir() === "ltr";
   const placement = isLtrDirection ? "right" : "left";

   const onSubmit = async (values, { setFieldError }) => {
      const saveType = values.rememberMe ? "localStorage" : "sessionStorage";
      const response = await login(values);
      if (response?.data?.success) {
         const { id, refresh, role, token } = response.data.data;
         setAuthenticate(id, refresh, role, token, saveType);
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
            <h3>{t("messages.AUTH.LOGIN.TITLE")}</h3>
            <p className="text-muted ">
               {t("messages.AUTH.GENERAL.NO_ACCOUNT")}
               <Link to={routes.REGISTER}>
                  {t("messages.AUTH.LOGIN.NEW_ACCOUNT")}
               </Link>
            </p>
         </div>
         {/* end::Head */}

         <LanguageSelectorDropdown
            overlayPlacement={placement}
            alignRight={!isLtrDirection}
         />

         <br />

         {/*begin::Form*/}

         <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={loginSchema(t)}
         >
            {formik => {
               const {
                  values: { rememberMe },
                  setFieldValue,
               } = formik;
               return (
                  <Form
                     noValidate="noValidate"
                     className="form fv-plugins-bootstrap fv-plugins-framework"
                  >
                     <div className="form-group fv-plugins-icon-container">
                        <label>{t("messages.AUTH.INPUT.EMAIL")}</label>
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
                        {t("messages.AUTH.GENERAL.FORGOT_BUTTON")}
                     </Link>
                     <br />
                     <br />
                     <div className="d-flex align-items-baseline">
                        <Checkbox
                           id="remember-me"
                           isSelected={rememberMe}
                           onChange={() =>
                              setFieldValue("rememberMe", !rememberMe)
                           }
                        >
                           {t("messages.AUTH.LABEL.REMEMBER.ME")}
                        </Checkbox>
                     </div>
                     <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
                        <CustomButton
                           type="submit"
                           id="kt_login_signin_submit"
                           disabled={formik.isSubmitting}
                           className={`btn btn-primary font-weight-bold px-9 py-4 my-3 fullWidth`}
                        >
                           <span>{t("messages.AUTH.LOGIN.BUTTON")}</span>
                        </CustomButton>
                        <CustomButton classNames="btn font-weight-bold px-9 py-4 my-3 login-with-google fullWidth">
                           <img src={googleLogo} alt="google logo" />
                           <span>{t("messages.AUTH.LOGIN.GOOGLE")}</span>
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
