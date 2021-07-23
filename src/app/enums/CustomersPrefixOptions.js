const statusPrefixOptions = (intl, formatMessage) => [
   { value: "", label: formatMessage(intl, "ECOMMERCE.COMMON.ALL") },
   {
      value: "active",
      label: formatMessage(intl, "ECOMMERCE.COMMON.ACTIVE"),
   },
   {
      value: "removed",
      label: formatMessage(intl, "ECOMMERCE.COMMON.REMOVED"),
   },
];

//

const rolePrefixOptions = (intl, formatMessage) => [
   { value: "", label: formatMessage(intl, "ECOMMERCE.COMMON.ALL") },
   { value: "admin", label: formatMessage(intl, "ECOMMERCE.COMMON.ADMIN") },
   { value: "user", label: formatMessage(intl, "ECOMMERCE.COMMON.USER") },
];

//
const fieldsIds = {
   fullName: "AUTH.INPUT.FULLNAME",
   mobile: "ECOMMERCE.COMMON.MOBILE",
   email: "ECOMMERCE.COMMON.EMAIL",
};

const searchByPrefixOptions = (intl, formatMessage) => [
   { value: "fullName", label: formatMessage(intl, fieldsIds.fullName) },
   { value: "email", label: formatMessage(intl, fieldsIds.email) },
   { value: "mobile", label: formatMessage(intl, fieldsIds.mobile) },
];

export {
   statusPrefixOptions,
   rolePrefixOptions,
   fieldsIds,
   searchByPrefixOptions,
};
