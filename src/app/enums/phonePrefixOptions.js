import toFarsiNumber from "../utils/toFarsiNumber";

const values = ["+98", "+99", "+97"];

const phonePrefixOptions = isEnglish =>
   values.map(val => ({
      value: val,
      label: isEnglish ? val : toFarsiNumber(val),
   }));

export default phonePrefixOptions;
