import React, { useState, useContext } from "react";
import { Form, Formik, ErrorMessage, Field } from "formik";
import { FormattedMessage, useIntl } from "react-intl";

import { Checkbox } from "../../../../../_metronic/_partials/controls/forms/Checkbox";
// components
import PhoneSelect from "../../../../components/PhoneSelect";
import TextError from "../../../../components/common/TextError";
// hooks
import useFormatMessage from "../../../../hooks/useFormatMessage";
// context
import { AuthenticationContext } from "../../../../context/AuthenticationContext";
// service
import { register } from "../../../../services/auth.service";
// utils
import { setAuthenticate } from "../../../../utils/authenticate";
import formatMessage from "../../../../utils/formatMessage";
import getInputClasses from "../../../../utils/getInputClasses";

import schema from "./registerSchema";
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
   const intl = useIntl();

   const isEnglish = intl.locale === "en";

   const registrationSchema = schema(useFormatMessage);

   const onSubmit = async ({
      email,
      password,
      subPhoneNumber,
      phoneNumber,
      fullName,
   }) => {
      const newUser = {
         email,
         password,
         mobile: `${subPhoneNumber}${phoneNumber}`,
         profile: {
            fullName,
         },
      };
      console.log(newUser);
      const { data } = await register(newUser);
      if (data?.success) {
         const { id, refresh, role, token } = data.data;
         setAuthenticate(id, refresh, role, token);
         setIsAuth(true);
      }
   };

   return (
      <div
         className="register login-form login-signin"
         style={{ display: "block" }}
      >
         <div className=" mb-5 mb-lg-10">
            <h3>
               <FormattedMessage id="AUTH.REGISTER.TITLE" />
            </h3>
            <p className="text-muted font-weight-bold">
               <FormattedMessage id="AUTH.REGISTER.DESC" />
            </p>
         </div>

         <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={registrationSchema}
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
                           <FormattedMessage id="AUTH.INPUT.FULLNAME" />
                        </label>
                        <Field
                           placeholder={formatMessage(
                              intl,
                              "AUTH.INPUT.FULLNAME.PLACE"
                           )}
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
                        <label>
                           <FormattedMessage id="AUTH.INPUT.PHONE" />
                        </label>
                        <div className="d-flex">
                           <div style={{ width: "80%" }}>
                              <Field
                                 placeholder={formatMessage(
                                    intl,
                                    "AUTH.INPUT.PHONE.PLACE"
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
                           <PhoneSelect
                              options={phonePrefixOptions(isEnglish)}
                              value={subPhoneNumber}
                              onChange={value =>
                                 setFieldValue("subPhoneNumber", value.value)
                              }
                              onBlur={() =>
                                 setFieldTouched("subPhoneNumber", true)
                              }
                              name="subPhoneNumber"
                           />
                        </div>
                     </div>
                     {/* end: Phone Number */}

                     {/* begin: Email */}
                     <div className="form-group fv-plugins-icon-container">
                        <label htmlFor="email">
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
                           id="email"
                        />
                        <ErrorMessage name="email" children={TextError} />
                     </div>

                     <div className="form-group fv-plugins-icon-container">
                        <label htmlFor="password">
                           <FormattedMessage id="AUTH.INPUT.PASSWORD" />
                        </label>
                        <div className="input-group">
                           <Field
                              placeholder={formatMessage(
                                 intl,
                                 "AUTH.REGISTER.PASSWORD.PLACE"
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
                           <FormattedMessage id="AUTH.GENERAL.ACCEPT.RULES" />
                        </Checkbox>
                        <ErrorMessage name="acceptTerms" children={TextError} />
                        {/*  */}
                     </div>

                     <div className="form-group d-flex">
                        <button
                           type="submit"
                           disabled={
                              formik.isSubmitting ||
                              !formik.isValid ||
                              !acceptTerms
                           }
                           className="btn btn-primary font-weight-bold px-10 my-3 "
                        >
                           <FormattedMessage
                              id="AUTH.GENERAL.REGISTER_BUTTON"
                              tagName="span"
                           />
                        </button>

                        <button
                           type="button"
                           className="btn btn-light-primary font-weight-bold px-10  my-3 mx-4"
                        >
                           <img src={googleLogo} alt="google logo" />
                           <FormattedMessage
                              id="AUTH.LOGIN.GOOGLE"
                              tagName="span"
                           />
                        </button>
                     </div>
                  </Form>
               );
            }}
         </Formik>
      </div>
   );
}

export default Registration;
