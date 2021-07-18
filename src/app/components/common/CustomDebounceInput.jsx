import React from "react";

import { DebounceInput } from "react-debounce-input";

const CustomDebounceInput = ({ onChange, ...props }) => (
   <DebounceInput
      minLength={3}
      onChange={onChange}
      debounceTimeout={400}
      {...props}
   />
);

export default CustomDebounceInput;
