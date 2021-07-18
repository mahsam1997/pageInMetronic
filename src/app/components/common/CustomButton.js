import React from "react";

import { FormattedMessage } from "react-intl";

const CustomButton = ({ title, onClick, classNames }) => (
   <button type="button" onClick={onClick} className={classNames}>
      <FormattedMessage id={title} />
   </button>
);

export default CustomButton;
