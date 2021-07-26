import React from "react";

import { useTranslation } from "react-i18next";
// import { FormattedMessage } from "react-intl";

const CustomButton = ({
   title,
   onClick,
   classNames,
   type = "button",
   children,
   ...props
}) => {
   const { t } = useTranslation();
   return (
      <button type={type} onClick={onClick} className={classNames} {...props}>
         {children}
         {/* <FormattedMessage id={title} tagName={tagName} /> */}
         {title && t(title)}
      </button>
   );
};

export default CustomButton;
