import i18next from "i18next";

const translator = (id, nuns = {}) => i18next.t(id, nuns);

export default translator;
