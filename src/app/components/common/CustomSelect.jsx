import React from "react";
import Select from "react-select";

const CustomSelect = ({
   options,
   value,
   customStyles = {},
   customOptionStyles = {},
   customSingleValueStyles = {},
   ...props
}) => {
   const selectStyles = {
      control: styles => ({
         ...styles,
         backgroundColor: "#ffffff",
         width: "100%",
         padding: "0",
         borderRadius: "4px",
         border: "1px solid rgba(0,0,0,.1)",
         paddingLeft: 5,
         fontStyle: "normal",
         fontWeight: 500,
         fontSize: "14px",
         lineHeight: "24px",
         ...customStyles,
      }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => ({
         ...styles,
         fontStyle: "normal",
         fontWeight: 500,
         fontSize: "14px",
         lineHeight: "24px",
         ...customOptionStyles,
      }),
      singleValue: styles => ({
         ...styles,
         ...customSingleValueStyles,
      }),
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
         {...props}
      />
   );
};

export default CustomSelect;
