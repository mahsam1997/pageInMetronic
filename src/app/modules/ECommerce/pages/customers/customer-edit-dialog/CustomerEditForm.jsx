// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";

import CustomButton from "../../../../../components/common/CustomButton";

import { useIntl } from "react-intl";
import useFormatMessage from "../../../../../hooks/useFormatMessage";
import formatMessage from "../../../../../utils/formatMessage";
import toFarsiNumber from "../../../../../utils/toFarsiNumber";
import { callingCodeList } from "../../../../../enums/phonePrefixOptions";

// Validation schema
const CustomerEditSchema = formatedMessage =>
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
         .required(formatedMessage("AUTH.VALIDATION.REQUIRED_FIELD")),

      email: Yup.string()
         .email(formatedMessage("AUTH.VALIDATION.EMAIL"))
         .required(formatedMessage("AUTH.VALIDATION.REQUIRED_FIELD")),

      mobile: Yup.string()
         .min(
            3,
            formatedMessage("MIN_X_CHARACTERS", {
               x: 3,
               noun: formatedMessage("AUTH.INPUT.PHONE"),
            })
         )
         .max(
            50,
            formatedMessage("MAX_X_CHARACTERS", {
               x: 50,
               noun: formatedMessage("AUTH.INPUT.PHONE"),
            })
         )
         .required(formatedMessage("AUTH.VALIDATION.REQUIRED_FIELD")),

      subMobile: Yup.string().required(
         formatedMessage("AUTH.VALIDATION.REQUIRED_FIELD")
      ),
   });

export function CustomerEditForm({
   saveCustomer,
   customer,
   actionsLoading,
   onHide,
}) {
   const intl = useIntl();
   const isEnglish = intl.locale === "en";

   const mobile = customer.mobile.slice(3);
   const subMobile = customer.mobile.substr(0, 3);

   const initialValues = {
      mobile,
      subMobile,
      fullName: customer.profile.fullName,
      email: customer.email,
   };

   return (
      <>
         <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={CustomerEditSchema(useFormatMessage)}
            onSubmit={values => {
               saveCustomer(values);
            }}
         >
            {({ handleSubmit, values }) => (
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
                                    "ECOMMERCE.COMMON.EMAIL"
                                 )}
                                 label={formatMessage(
                                    intl,
                                    "ECOMMERCE.COMMON.EMAIL"
                                 )}
                              />
                           </div>
                        </div>
                        <div className="form-group row">
                           {/* Sub Mobile */}
                           <div className="col-lg-4 ">
                              <Select
                                 name="subMobile"
                                 label={formatMessage(
                                    intl,
                                    "DEFAULT.SUB_PHONE"
                                 )}
                              >
                                 {callingCodeList.map((callCode, i) => (
                                    <option key={i} value={callCode}>
                                       {isEnglish
                                          ? callCode
                                          : toFarsiNumber(callCode)}
                                    </option>
                                 ))}
                              </Select>
                           </div>
                           {/* Mobile */}
                           <div className="col-lg-4">
                              <Field
                                 type="number"
                                 name="mobile"
                                 component={Input}
                                 placeholder={formatMessage(
                                    intl,
                                    "ECOMMERCE.COMMON.MOBILE"
                                 )}
                                 label={formatMessage(
                                    intl,
                                    "ECOMMERCE.COMMON.MOBILE"
                                 )}
                              />
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
                     />
                  </Modal.Footer>
               </>
            )}
         </Formik>
      </>
   );
}
