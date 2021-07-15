import React from "react";
import Select from "react-select";

const PhoneSelect = ({ options, value, ...props }) => {
   const selectStyles = {
      control: styles => ({
         ...styles,
         backgroundColor: "#ffffff",
         width: "90px",
         padding: "7px 0",
         borderRadius: "12px",
         marginRight: "10px",
         marginLeft: "10px",
         border: "none",
         direction: "ltr",
         paddingLeft: 5,
         //  color: "#A7A8BB",
         fontStyle: "normal",
         fontWeight: 500,
         fontSize: "14px",
         lineHeight: "24px",
      }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
         return {
            ...styles,
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "24px",
            // color: "#A7A8BB",
         };
      },
      // input: styles => ({ ...styles, ...dot() }),
      // placeholder: styles => ({ ...styles, ...dot() }),
      // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
   };

   const defaultValue = options.filter(option => option.value === value)[0];

   return (
      <Select
         options={options}
         defaultValue={defaultValue}
         styles={selectStyles}
         components={{
            IndicatorSeparator: () => null,
         }}
         // value={defaultValue}
         {...props}
      />
   );
};

export default PhoneSelect;
