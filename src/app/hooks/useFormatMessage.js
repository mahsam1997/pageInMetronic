import { useIntl } from "react-intl";

const useFormatMessage = (id, enums) => {
   const intl = useIntl();
   return intl.formatMessage(
      {
         id,
      },
      enums
   );
};

export default useFormatMessage;
