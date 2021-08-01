import React from "react";

import { useTranslation } from "react-i18next";

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
         {title && t(title)}
      </button>
   );
};

export default CustomButton;
