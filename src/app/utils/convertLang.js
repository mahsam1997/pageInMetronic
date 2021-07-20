const convertLang = (enumsArr = []) => {
   const enumsObj = {};
   enumsArr.forEach(e => {
      enumsObj[e.key] = e.value;
   });
   return enumsObj;
};

export default convertLang;
