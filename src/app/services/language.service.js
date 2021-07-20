import http from "./http.service";

import urls from "./urls.json";

const getLanguageList = () =>
   http.get(`${urls.LANGUAGE_LIST}/get-list?platform=adminPanel`);

// const getLanguage = () =>
//    http.get(`${urls.LANGUAGE_LIST}/get-list?platform=adminPanel`);

export { getLanguageList };
