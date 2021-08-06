import { isArray } from "lodash";

const convertLang = (enumsArr = []) => {
   const enumsObj = {};
   enumsArr.forEach(e => {
      if (isArray(e.value)) {
         const subEnumObject = {};
         e.value.forEach(subE => {
            subEnumObject[subE.key] = subE.value;
         });
         enumsObj[e.key] = subEnumObject;
      } else {
         enumsObj[e.key] = e.value;
      }
   });
   return enumsObj;
};

export default convertLang;
