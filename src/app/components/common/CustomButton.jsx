import React from "react";

import { FormattedMessage } from "react-intl";

const CustomButton = ({
   title,
   onClick,
   classNames,
   type = "button",
   children,
   tagName,
   ...props
}) => (
   <button type={type} onClick={onClick} className={classNames} {...props}>
      {children}
      <FormattedMessage id={title} tagName={tagName} />
   </button>
);

export default CustomButton;
