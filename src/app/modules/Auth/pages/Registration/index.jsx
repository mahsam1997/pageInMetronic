import React, { useState, useContext } from "react";
import { Form, Formik, ErrorMessage, Field } from "formik";

import { Checkbox } from "../../../../../_metronic/_partials/controls/forms/Checkbox";
// components
import PhoneSelect from "../../../../components/PhoneSelect";
import TextError from "../../../../components/common/TextError";
import { LanguageSelectorDropdown } from "../../../../../_metronic/layout/components/extras/dropdowns/LanguageSelectorDropdown";

import CustomButton from "../../../../components/common/CustomButton";
// hooks
import { useTranslation } from "react-i18next";
// context
import { AuthenticationContext } from "../../../../context/AuthenticationContext";
// service
import { register } from "../../../../services/auth.service";
// utils
import { setAuthenticate } from "../../../../utils/authenticate";
import getInputClasses from "../../../../utils/getInputClasses";

import registerSchema from "./registerSchema";
import phonePrefixOptions from "../../../../enums/phonePrefixOptions";

import googleLogo from "../../../../Assets/images/google-logo-removebg.png";

const initialValues = {
   fullName: "",
   phoneNumber: "",
   subPhoneNumber: "+98",
   email: "",
   password: "",
   acceptTerms: false,
};

function Registration(props) {
   const [showPassword, setShowPassword] = useState(false);

   const { setIsAuth } = useContext(AuthenticationContext);
   const { t, i18n } = useTranslation();
   const isLtrDirection = i18n.dir() === "ltr";
   const placement = isLtrDirection ? "right" : "left";

   const onSubmit = async (
      { email, password, subPhoneNumber, phoneNumber, fullName },
      { setFieldError }
   ) => {
      const newUser = {
         email,
         password,
         mobile: `${subPhoneNumber}${phoneNumber}`,
         profile: {
            fullName,
         },
      };

      const response = await register(newUser);
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
      <div
         className="register login-form login-signin"
         style={{ display: "block" }}
      >
         <div className=" mb-5 mb-lg-10">
            <h3>{t("messages.AUTH.REGISTER.TITLE")}</h3>
            <p className="text-muted font-weight-bold">
               {t("messages.AUTH.REGISTER.DESC")}
            </p>
         </div>

         <LanguageSelectorDropdown
            overlayPlacement={placement}
            alignRight={!isLtrDirection}
         />

         <br />

         <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={registerSchema(t)}
         >
            {formik => {
               const {
                  values: { acceptTerms, subPhoneNumber },
                  setFieldValue,
                  setFieldTouched,
               } = formik;

               return (
                  <Form
                     noValidate="noValidate"
                     id="kt_login_signin_form"
                     className="form fv-plugins-bootstrap fv-plugins-framework animated animate__animated animate__backInUp"
                  >
                     {/* begin: FullName */}
                     <div className="form-group fv-plugins-icon-container">
                        <label htmlFor="fullName">
                           {t("messages.AUTH.INPUT.FULLNAME")}
                        </label>
                        <Field
                           placeholder={t("messages.AUTH.INPUT.FULLNAME.PLACE")}
                           type="text"
                           className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                              formik,
                              "fullName"
                           )}`}
                           name="fullName"
                           id="fullName"
                        />
                        <ErrorMessage name="fullName" children={TextError} />
                     </div>
                     {/* end: Fullname */}

                     {/* begin: Phone Number */}
                     <div className="form-group fv-plugins-icon-container">
                        <label>{t("messages.AUTH.INPUT.PHONE")}</label>
                        <div className="d-flex-rtl-disable">
                           <PhoneSelect
                              options={phonePrefixOptions(isLtrDirection)}
                              value={subPhoneNumber}
                              onChange={value =>
                                 setFieldValue("subPhoneNumber", value.value)
                              }
                              onBlur={() =>
                                 setFieldTouched("subPhoneNumber", true)
                              }
                              name="subPhoneNumber"
                           />
                           <div
                              style={{
                                 width: "80%",
                                 marginLeft: "10px",
                              }}
                              className="mobile-input"
                           >
                              <Field
                                 placeholder={t(
                                    "messages.AUTH.INPUT.PHONE.PLACE"
                                 )}
                                 type="number"
                                 className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                                    formik,
                                    "phoneNumber"
                                 )}`}
                                 name="phoneNumber"
                              />
                              <ErrorMessage
                                 name="phoneNumber"
                                 children={TextError}
                              />
                           </div>
                        </div>
                     </div>
                     {/* end: Phone Number */}

                     {/* begin: Email */}
                     <div className="form-group fv-plugins-icon-container">
                        <label htmlFor="email">
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
                           id="email"
                        />
                        <ErrorMessage name="email" children={TextError} />
                     </div>

                     <div className="form-group fv-plugins-icon-container">
                        <label htmlFor="password">
                           {t("messages.AUTH.INPUT.PASSWORD")}
                        </label>
                        <div className="input-group">
                           <Field
                              placeholder={t(
                                 "messages.AUTH.REGISTER.PASSWORD.PLACE"
                              )}
                              type={showPassword ? "text" : "password"}
                              className={`password-input form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
                                 formik,
                                 "password"
                              )}`}
                              id="password"
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
                     {/* end: Password */}

                     <div className="d-flex align-items-baseline">
                        <Checkbox
                           id="accept-rules"
                           isSelected={acceptTerms}
                           onChange={() => {
                              setFieldValue("acceptTerms", !acceptTerms);
                              setFieldTouched("acceptTerms", true);
                           }}
                        >
                           {t("messages.AUTH.GENERAL.ACCEPT.RULES")}
                        </Checkbox>
                        <ErrorMessage name="acceptTerms" children={TextError} />
                     </div>

                     <div className="form-group d-flex">
                        <CustomButton
                           type="submit"
                           disabled={
                              formik.isSubmitting ||
                              !formik.isValid ||
                              !acceptTerms
                           }
                           classNames="btn btn-primary font-weight-bold px-10 my-3 "
                        >
                           <span>
                              {t("messages.AUTH.GENERAL.REGISTER_BUTTON")}
                           </span>
                        </CustomButton>
                        <CustomButton classNames="btn btn-light-primary font-weight-bold px-10  my-3 mx-4">
                           <img src={googleLogo} alt="google logo" />
                           <span>{t("messages.AUTH.LOGIN.GOOGLE")}</span>
                        </CustomButton>
                     </div>
                  </Form>
               );
            }}
         </Formik>
      </div>
   );
}

export default Registration;
