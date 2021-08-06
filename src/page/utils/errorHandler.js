import { isArray } from "lodash";

import showToast from "./showToast";

const errorHandler = error => {
   const errorRes = error?.response?.data;

   if (isArray(errorRes.errors) && errorRes?.errors[0]?.field) {
      error.errorMessage = true;
      return error;
   } else {
      const toastMessage = {
         type: "error",
         text: errorRes.error,
      };
      showToast(toastMessage);
   }
};

export default errorHandler;
