const statusPrefixOptions = (intl, formatMessage) => [
   { value: "", label: formatMessage(intl, "DEFAULT.ALL") },
   {
      value: "active",
      label: formatMessage(intl, "USERS.COMMON.ACTIVE"),
   },
   {
      value: "removed",
      label: formatMessage(intl, "USERS.COMMON.REMOVED"),
   },
];

//

const rolePrefixOptions = (intl, formatMessage) => [
   { value: "", label: formatMessage(intl, "DEFAULT.ALL") },
   { value: "admin", label: formatMessage(intl, "USERS.COMMON.ADMIN") },
   { value: "user", label: formatMessage(intl, "USERS.COMMON.USER") },
];

//
const fieldsIds = {
   fullName: "AUTH.INPUT.FULLNAME",
   mobile: "DEFAULT.MOBILE",
   email: "DEFAULT.EMAIL",
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
