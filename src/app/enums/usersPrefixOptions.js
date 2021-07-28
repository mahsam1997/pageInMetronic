import i18next from "i18next";

const statusPrefixOptions = [
   {
      value: "",
      label: i18next.t("messages.DEFAULT.ALL"),
   },
   {
      value: "active",
      label: i18next.t("messages.USERS.COMMON.ACTIVE"),
   },
   {
      value: "removed",
      label: i18next.t("messages.USERS.COMMON.REMOVED"),
   },
];

const rolePrefixOptions = [
   { value: "", label: i18next.t("messages.DEFAULT.ALL") },
   { value: "admin", label: i18next.t("messages.USERS.COMMON.ADMIN") },
   { value: "user", label: i18next.t("messages.USERS.COMMON.USER") },
];

const fieldsIds = {
   fullName: "messages.AUTH.INPUT.FULLNAME",
   mobile: "messages.DEFAULT.MOBILE",
   email: "messages.DEFAULT.EMAIL",
};

const searchByPrefixOptions = [
   { value: "fullName", label: i18next.t(fieldsIds.fullName) },
   { value: "email", label: i18next.t(fieldsIds.email) },
   { value: "mobile", label: i18next.t(fieldsIds.mobile) },
];

export {
   statusPrefixOptions,
   rolePrefixOptions,
   fieldsIds,
   searchByPrefixOptions,
};
