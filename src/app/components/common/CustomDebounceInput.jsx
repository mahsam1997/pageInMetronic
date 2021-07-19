import React from "react";

import { DebounceInput } from "react-debounce-input";

const CustomDebounceInput = ({
   onChange,
   minLength,
   debounceTimeout,
   ...props
}) => (
   <DebounceInput
      minLength={minLength}
      onChange={onChange}
      debounceTimeout={debounceTimeout}
      {...props}
   />
);

CustomDebounceInput.defaultProps = {
   minLength: 3,
   debounceTimeout: 400,
};

export default CustomDebounceInput;
