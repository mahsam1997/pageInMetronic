// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../_metronic/_partials/controls";

import CustomButton from "../../components/common/CustomButton";

import { useIntl, FormattedMessage } from "react-intl";
import useFormatMessage from "../../hooks/useFormatMessage";
import formatMessage from "../../utils/formatMessage";
import CustomSelect from "../../components/common/CustomSelect";
import phonePrefixOptions from "../../enums/phonePrefixOptions";

// Validation schema
const UserEditSchema = formatedMessage =>
   Yup.object().shape({
      fullName: Yup.string()
         .min(
            3,
            formatedMessage("MIN_X_CHARACTERS", {
               x: 3,
               noun: formatedMessage("AUTH.INPUT.FULLNAME"),
            })
         )
         .max(
            50,
            formatedMessage("MAX_X_CHARACTERS", {
               x: 50,
               noun: formatedMessage("AUTH.INPUT.FULLNAME"),
            })
         )
         .required(formatedMessage("REQUIRED")),

      email: Yup.string()
         .email(formatedMessage("AUTH.VALIDATION.EMAIL"))
         .required(formatedMessage("REQUIRED")),

      mobile: Yup.string()
         .min(
            10,
            formatedMessage("MIN_X_CHARACTERS", {
               x: 10,
               noun: formatedMessage("AUTH.INPUT.PHONE"),
            })
         )
         .max(
            10,
            formatedMessage("MAX_X_CHARACTERS", {
               x: 10,
               noun: formatedMessage("AUTH.INPUT.PHONE"),
            })
         )
         .required(formatedMessage("REQUIRED")),

      countryCode: Yup.string().required(formatedMessage("REQUIRED")),
   });

function UserEditForm({ saveUser, user, actionsLoading, onHide }) {
   const intl = useIntl();
   const isEnglish = intl.locale === "en";

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
            validationSchema={UserEditSchema(useFormatMessage)}
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
                                    placeholder={formatMessage(
                                       intl,
                                       "AUTH.INPUT.FULLNAME"
                                    )}
                                    label={formatMessage(
                                       intl,
                                       "AUTH.INPUT.FULLNAME"
                                    )}
                                 />
                              </div>
                              {/* Email */}
                              <div className="col-lg-4">
                                 <Field
                                    type="text"
                                    name="email"
                                    component={Input}
                                    placeholder={formatMessage(
                                       intl,
                                       "DEFAULT.EMAIL"
                                    )}
                                    label={formatMessage(intl, "DEFAULT.EMAIL")}
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
                                    placeholder={formatMessage(
                                       intl,
                                       "DEFAULT.MOBILE"
                                    )}
                                    label={formatMessage(
                                       intl,
                                       "DEFAULT.MOBILE"
                                    )}
                                 />
                              </div>
                              {/* Sub Mobile */}
                              <div className="col-lg-4 ">
                                 <label>
                                    <FormattedMessage id="DEFAULT.SUB_PHONE" />
                                 </label>
                                 {values.countryCode && (
                                    <CustomSelect
                                       options={phonePrefixOptions(isEnglish)}
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
                                    />
                                 )}
                              </div>
                           </div>
                        </Form>
                     </Modal.Body>
                     <Modal.Footer>
                        <CustomButton
                           title="AUTH.GENERAL.CANCEL"
                           onClick={onHide}
                           classNames="btn btn-light btn-elevate"
                        />
                        <CustomButton
                           type="submit"
                           title="DEFAULT.SAVE"
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
