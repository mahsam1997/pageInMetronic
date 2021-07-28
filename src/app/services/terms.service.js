import http from "./http.service";
import urls from "./urls.json";

const getTerms = lng =>
   http.get(`${urls.PAGES}/user?language=${lng}&key=terms`);

export { getTerms };
