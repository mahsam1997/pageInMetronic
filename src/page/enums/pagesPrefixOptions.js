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
const statusPrefixOptionsCreate = [
   
   {
      value:"active",
      label: i18next.t("messages.USERS.COMMON.ACTIVE"),
   },
   {
      value: "removed",
      label: i18next.t("messages.USERS.COMMON.REMOVED"),
   },
];
const languagePrefixOptions = [
   { value:"" , label: i18next.t("messages.DEFAULT.ALL") },
   { value: "en", label: " en" },
   { value: "fa", label: " fa" },
];
const languagePrefixOptionsCreate = [
   { value: "en", label: " en" },
   { value: "fa", label: " fa" },
];
const fieldsIds = {
   key: "کلید",
   title: "عنوان",
};

const searchByPrefixOptions = [
   { value: "key", label: "کلید" },
   { value: "title", label: "عنوان" },
];

export {
   statusPrefixOptions,
   statusPrefixOptionsCreate,
   languagePrefixOptionsCreate,
   languagePrefixOptions,
   fieldsIds,
   searchByPrefixOptions,
};
