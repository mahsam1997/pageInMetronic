import i18next from "i18next";

const translator = (id, nouns = {}) => i18next.t(id, nouns);

export default translator;
