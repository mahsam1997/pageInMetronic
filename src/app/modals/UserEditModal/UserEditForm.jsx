// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../_metronic/_partials/controls";

import { useTranslation } from "react-i18next";
import CustomButton from "../../components/common/CustomButton";
import CustomSelect from "../../components/common/CustomSelect";
import phonePrefixOptions from "../../enums/phonePrefixOptions";

// Validation schema
const UserEditSchema = t =>
   Yup.object().shape({
      fullName: Yup.string()
         .min(
            3,
            t("errors.MIN_X_CHARACTERS", {
               x: 3,
               noun: t("messages.AUTH.INPUT.FULLNAME"),
            })
         )
         .max(
            50,
            t("errors.MAX_X_CHARACTERS", {
               x: 50,
               noun: t("messages.AUTH.INPUT.FULLNAME"),
            })
         )
         .required(t("errors.REQUIRED")),

      email: Yup.string()
         .email(t("errors.AUTH.VALIDATION.EMAIL"))
         .required(t("errors.REQUIRED")),

      mobile: Yup.string()
         .min(
            10,
            t("errors.EXACT_X_CHARACTERS", {
               x: 10,
               noun: t("messages.AUTH.INPUT.PHONE"),
            })
         )
         .max(
            10,
            t("errors.EXACT_X_CHARACTERS", {
               x: 10,
               noun: t("messages.AUTH.INPUT.PHONE"),
            })
         )
         .required(t("errors.REQUIRED")),

      countryCode: Yup.string().required(t("errors.REQUIRED")),
   });

function UserEditForm({ saveUser, user, actionsLoading, onHide }) {
   const { t, i18n } = useTranslation();

   const isLtrDir = i18n.dir() === "ltr";

   const initialValues = {
      mobile: user.mobile,
      countryCode: user.countryCode,
      fullName: user.profile.fullName,
      email: user.email,
   };

   return (
      <>
         <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={UserEditSchema(t)}
            onSubmit={values => {
               saveUser(values);
            }}
         >
            {formik => {
               const {
                  handleSubmit,
                  values,
                  setFieldValue,
                  setFieldTouched,
               } = formik;
               return (
                  <>
                     <Modal.Body className="overlay overlay-block cursor-default">
                        {actionsLoading && (
                           <div className="overlay-layer bg-transparent">
                              <div className="spinner spinner-lg spinner-success" />
                           </div>
                        )}
                        <Form className="form form-label-right">
                           <div className="form-group row">
                              {/* Full Name */}
                              <div className="col-lg-4">
                                 <Field
                                    name="fullName"
                                    component={Input}
                                    placeholder={t(
                                       "messages.AUTH.INPUT.FULLNAME"
                                    )}
                                    label={t("messages.AUTH.INPUT.FULLNAME")}
                                 />
                              </div>
                              {/* Email */}
                              <div className="col-lg-4">
                                 <Field
                                    type="text"
                                    name="email"
                                    component={Input}
                                    placeholder={t("messages.DEFAULT.EMAIL")}
                                    label={t("messages.DEFAULT.EMAIL")}
                                 />
                              </div>
                           </div>
                           <div className="form-group row">
                              {/* Mobile */}
                              <div className="col-lg-4">
                                 <Field
                                    type="number"
                                    name="mobile"
                                    component={Input}
                                    placeholder={t("messages.DEFAULT.MOBILE")}
                                    label={t("messages.DEFAULT.MOBILE")}
                                 />
                              </div>
                              {/* Sub Mobile */}
                              <div className="col-lg-4 ">
                                 <label>
                                    {t("messages.DEFAULT.SUB_PHONE")}
                                 </label>
                                 {values.countryCode && (
                                    <CustomSelect
                                       options={phonePrefixOptions(isLtrDir)}
                                       value={values.countryCode}
                                       onChange={value =>
                                          setFieldValue(
                                             "countryCode",
                                             value.value
                                          )
                                       }
                                       onBlur={() =>
                                          setFieldTouched("countryCode", true)
                                       }
                                       name="countryCode"
                                       customSingleValueStyles={{
                                          direction: "ltr",
                                       }}
                                       customOptionStyles={{
                                          direction: "ltr",
                                       }}
                                    />
                                 )}
                              </div>
                           </div>
                        </Form>
                     </Modal.Body>
                     <Modal.Footer>
                        <CustomButton
                           title="messages.AUTH.GENERAL.CANCEL"
                           onClick={onHide}
                           classNames="btn btn-light btn-elevate"
                        />
                        <CustomButton
                           type="submit"
                           title="messages.DEFAULT.SAVE"
                           onClick={() => handleSubmit()}
                           classNames="btn btn-primary btn-elevate"
                           disabled={formik.isSubmitting || !formik.isValid}
                        />
                     </Modal.Footer>
                  </>
               );
            }}
         </Formik>
      </>
   );
}

export default UserEditForm;
