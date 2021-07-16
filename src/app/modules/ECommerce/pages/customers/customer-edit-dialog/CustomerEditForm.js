// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
   Input,
   Select,
   DatePickerField,
} from "../../../../../../_metronic/_partials/controls";

// Validation schema
const CustomerEditSchema = Yup.object().shape({
   profile: Yup.object().shape({
      fullName: Yup.string()
         .min(3, "Minimum 3 symbols")
         .max(50, "Maximum 50 symbols")
         .required("Firstname is required"),
   }),
   email: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
   mobile: Yup.string().required("Username is required"),
   subMobile: Yup.string().required("Username is required"),
});

export function CustomerEditForm({
   saveCustomer,
   customer,
   actionsLoading,
   onHide,
}) {
   const mobile = customer.mobile.slice(3);
   const subMobile = customer.mobile.substr(0, 3);

   const initialValues = {
      mobile,
      subMobile,
      profile: {
         fullName: customer.profile.fullName,
      },
      email: customer.email,
   };

   return (
      <>
         <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={CustomerEditSchema}
            onSubmit={values => {
               saveCustomer(values);
            }}
         >
            {({ handleSubmit, setFieldValue, setFieldTouched, values }) => (
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
                                 name="profile.fullName"
                                 component={Input}
                                 placeholder="Full Name"
                                 label="Full Name"
                              />
                           </div>
                           {/* Email */}
                           <div className="col-lg-4">
                              <Field
                                 type="text"
                                 name="email"
                                 component={Input}
                                 placeholder="Email"
                                 label="Email"
                              />
                           </div>
                        </div>
                        <div className="form-group row">
                           {/* Sub Mobile */}
                           <div className="col-lg-4 ">
                              <Select name="subMobile" label="sub phone">
                                 <option>+98</option>
                                 <option>+97</option>
                              </Select>
                           </div>
                           {/* Mobile */}
                           <div className="col-lg-4">
                              <Field
                                 type="number"
                                 name="mobile"
                                 component={Input}
                                 placeholder="mobile"
                                 label="mobile"
                              />
                           </div>
                        </div>
                     </Form>
                  </Modal.Body>
                  <Modal.Footer>
                     <button
                        type="button"
                        onClick={onHide}
                        className="btn btn-light btn-elevate"
                     >
                        Cancel
                     </button>
                     <> </>
                     <button
                        type="submit"
                        onClick={() => handleSubmit()}
                        className="btn btn-primary btn-elevate"
                     >
                        Save
                     </button>
                  </Modal.Footer>
               </>
            )}
         </Formik>
      </>
   );
}
