const objectToArray = object =>
   Object.keys(object).map(key => ({
      key: key,
      value: object[key],
   }));

export default objectToArray;
