import React from "react";

import CustomSelect from "./common/CustomSelect";

import colors from "../Assets/sass/colors.scss";

const PhoneSelect = ({ options, value, ...props }) => {
   return (
      <CustomSelect
         options={options}
         value={value}
         customStyles={{
            width: "90px",
            padding: "7px 0",
            borderRadius: "12px",
            border: "none",
            color: colors.gray,
         }}
         customOptionStyles={{
            color: colors.gray,
         }}
         customSingleValueStyles={{
            color: colors.gray,
         }}
         {...props}
      />
   );
};

export default PhoneSelect;
