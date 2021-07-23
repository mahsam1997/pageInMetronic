import countryCodes from "country-codes-list";

import toFarsiNumber from "../utils/toFarsiNumber";

const myCountryCodes = countryCodes.customList(
   "countryCode",
   "+{countryCallingCode}"
);

const values = Object.values(myCountryCodes);

const phonePrefixOptions = isEnglish =>
   values.map(val => ({
      value: val,
      label: isEnglish ? val : toFarsiNumber(val),
   }));

export default phonePrefixOptions;
