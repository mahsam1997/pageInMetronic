// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from "react";
// import { Modal } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../_metronic/_partials/controls";
// import Cards from "../pageEdit/cards";
import { useTranslation } from "react-i18next";
import { CKEditor } from 'ckeditor4-react'
import CustomButton from "../../components/common/CustomButton";
import CustomSelect from "../../components/common/CustomSelect";
import {
   statusPrefixOptionsCreate,
   languagePrefixOptionsCreate,
} from "../../enums/pagesPrefixOptions";
import { Card } from "../../../_metronic/_partials/controls";
import { CardFooter } from "../../../_metronic/_partials/controls";

// Validation schema
const PageEditSchema = (t, isLtrDir) =>
   Yup.object().shape({
      title: Yup.string()
         .min(3, "تعداد کاراکترها باید حداقل 3 باشد")
         .max(30, "تعداد کاراکترها باید حداکثر 30 باشد")
         .required(t("errors.REQUIRED")),
      content: Yup.string()
         .min(5, "تعداد کاراکترها باید حداقل 5 باشد")
         .max(300, "تعداد کاراکترها باید حداکثر 300 باشد")
         .required(t("errors.REQUIRED")),
      key: Yup.string()
         .min(3, "تعداد کاراکترها باید حداقل 3 باشد")
         .max(20, "تعداد کاراکترها باید حداکثر 2- باشد")
         .required(t("errors.REQUIRED")),
   });

function PageCreateForm({ savePage, page, actionsLoading, onHide }) {
   console.log("component formrender editesss");
   const { t, i18n } = useTranslation();

   const isLtrDir = i18n.dir() === "ltr";

   const initialValues = {
      title: page.title,
      content: page.content,
      key: page.key,
      status: page.status,
      language: page.language,
   };

   return (
      <>
         <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={PageEditSchema(t, isLtrDir)}
            onSubmit={(values, { setFieldError }) => {
               savePage(values, setFieldError);
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
                     <Card>
                        {actionsLoading && (
                           <div className="overlay-layer bg-transparent">
                              <div className="spinner spinner-lg spinner-success" />
                           </div>
                        )}
                        <Form className="form form-label-right">
                           <div className="form-group row">
                              {/* title */}
                              <div className="col-lg-6 mt-2 mx-5">
                                 <Field
                                    name="title"
                                    component={Input}
                                    placeholder="عنوان"
                                    label="عنوان"
                                 />
                              </div>
                              {/* language */}
                              <div className="col-lg-4 mx-5 mt-10">
                                 <CustomSelect
                                    label="وضعیت"
                                    placeholder="وضعیت"
                                    options={statusPrefixOptionsCreate}
                                    value={values.status}
                                    onChange={value =>
                                       setFieldValue("status", value.value)
                                    }
                                    onBlur={() =>
                                       setFieldTouched("status", true)
                                    }
                                    name="status"
                                    customOptionStyles={{
                                       direction: "rtl",
                                    }}
                                 />
                              </div>
                           </div>
                           <div className="form-group row">
                              <div className="col-lg-6 mt-2 mx-5 ">
                                 <Field
                                    name="key"
                                    component={Input}
                                    placeholder="کلید"
                                    label="کلید"
                                 />
                              </div>
                              {/* language */}
                              <div className="col-lg-4 mx-5 mt-10">
                                 <CustomSelect
                                    label="زبان"
                                    placeholder="زبان"
                                    options={languagePrefixOptionsCreate}
                                    value={values.language}
                                    onChange={value =>
                                       setFieldValue("language", value.value)
                                    }
                                    onBlur={() =>
                                       setFieldTouched("language", true)
                                    }
                                    name="language"
                                    customOptionStyles={{
                                       direction: "rtl",
                                    }}
                                 />
                              </div>
                           </div>
                           <div className="form-group row">
                              <div className="col-lg-11 mx-5">
                                 <CKEditor
                                    value={values.content}
                                 />
                              </div>
                           </div>
                           <CardFooter>
                              <CustomButton
                                 type="submit"
                                 title="messages.DEFAULT.SAVE"
                                 // title="صفحه به درستی ذخیره شد"
                                 onClick={() => handleSubmit()}
                                 classNames="btn btn-primary btn-elevate"
                                 disabled={
                                    formik.isSubmitting || !formik.isValid
                                 }
                              />
                              <CustomButton
                                 title="messages.AUTH.GENERAL.CANCEL"
                                 onClick={onHide}
                                 classNames="btn btn-light btn-elevate ml-4"
                              />
                           </CardFooter>
                        </Form>
                     </Card>
                  </>
               );
            }}
         </Formik>
      </>
   );
}

export default PageCreateForm;
