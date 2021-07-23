import countryCodes from "country-codes-list";

import toFarsiNumber from "../utils/toFarsiNumber";

const myCountryCodes = countryCodes.customList(
   "countryCode",
   "+{countryCallingCode}"
);

// const countryCallingCodes = Object.values(myCountryCodes)

// console.log("country codes: ", countryCallingCodes);

// const values = ["+98", "+99", "+97"];
const values = Object.values(myCountryCodes);

const phonePrefixOptions = isEnglish =>
   values.map(val => ({
      value: val,
      label: isEnglish ? val : toFarsiNumber(val),
   }));

export default phonePrefixOptions;
