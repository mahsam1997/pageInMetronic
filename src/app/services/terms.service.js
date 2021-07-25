import http from "./http.service";

const getTerms = lng => http.get(`/api/pages/user?language=${lng}&key=terms`);

export { getTerms };
