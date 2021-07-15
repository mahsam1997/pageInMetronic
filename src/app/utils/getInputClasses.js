const getInputClasses = (intl, formik, fieldname) => {
   const isEnglish = intl.locale === "en";

   if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return `is-invalid ${isEnglish ? "right" : "left"}`;
   }

   if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return `is-valid ${isEnglish ? "right" : "left"}`;
   }

   return "";
};

export default getInputClasses;
