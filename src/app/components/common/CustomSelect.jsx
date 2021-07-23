import React from "react";
import Select from "react-select";
import { useIntl } from "react-intl";

const CustomSelect = ({ options, value, customStyles, ...props }) => {
   const isEnglish = useIntl().locale === "en";

   const selectStyles = {
      control: styles => ({
         ...styles,
         backgroundColor: "#ffffff",
         width: "100%",
         padding: "0",
         borderRadius: "4px",
         border: "1px solid rgba(0,0,0,.1)",
         direction: isEnglish ? "ltr" : "rtl",
         paddingLeft: 5,
         fontStyle: "normal",
         fontWeight: 500,
         fontSize: "14px",
         lineHeight: "24px",
         ...customStyles,
      }),
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
         return {
            ...styles,
            fontStyle: "normal",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "24px",
         };
      },
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
