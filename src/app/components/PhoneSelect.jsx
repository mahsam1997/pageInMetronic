import React from "react";
import CustomSelect from "./common/CustomSelect";

const PhoneSelect = ({ options, value }) => {
   return (
      <CustomSelect
         options={options}
         value={value}
         customStyles={{
            width: "90px",
            padding: "7px 0",
            borderRadius: "12px",
            border: "none",
            marginRight: "10px",
            marginLeft: "10px",
         }}
      />
   );
};

export default PhoneSelect;
