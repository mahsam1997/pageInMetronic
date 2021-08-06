import countryCodes from "country-codes-list";

import toFarsiNumber from "../utils/toFarsiNumber";

const myCountryCodes = countryCodes.customList(
   "countryCode",
   "+{countryCallingCode}"
);

const callingCodeList = Object.values(myCountryCodes);

const phonePrefixOptions = isLtrDir =>
   callingCodeList.map(val => ({
      value: val,
      label: isLtrDir ? val : toFarsiNumber(val),
   }));

export { callingCodeList };

export default phonePrefixOptions;
