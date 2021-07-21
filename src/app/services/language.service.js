import http from "./http.service";

import urls from "./urls.json";

const getLanguageList = () =>
   http.get(`${urls.LANGUAGE}/get-list?platform=adminPanel`);

const createLanguage = newLang => http.post(urls.LANGUAGE, newLang);

const editLanguage = (langId, editLang) =>
   http.put(`${urls.LANGUAGE}/${langId}`, editLang);

export { getLanguageList, createLanguage, editLanguage };
