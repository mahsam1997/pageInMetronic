import React from "react";
import Select from "react-select";
import { useIntl } from "react-intl";

const CustomSelect = ({ options, value, customStyles, ...props }) => {
   const isEnglish = useIntl().locale === "en";

   const selectStyles = {
      control: styles => ({
         ...styles,
         backgroundColor: "#ffffff",
         //  width: "90px",
         width: "100%",
         //  padding: "7px 0",
         padding: "0",
         //  borderRadius: "12px",
         borderRadius: "4px",
         //  marginRight: "10px",
         //  border: "none",
         border: "1px solid rgba(0,0,0,.1)",
         direction: isEnglish ? "ltr" : "rtl",
         paddingLeft: 5,
         //  color: "#A7A8BB",
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

export default CustomSelect;
