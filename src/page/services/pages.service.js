import http from "./http.service";

import generatePageFilter from "../utils/generatePageFilter";

import urls from "./urls.json";

const getPages = (limit, pageNumber, filter, sortOrder, sortField) =>
   http.get(
      `${urls.PAGES}?limit=${limit}&page=${pageNumber}${generatePageFilter(
         filter
      )}&sort[${sortField}]=${sortOrder === "asc" ? 1 : -1}`
   );
const getPage = id => http.get(`${urls.PAGES}/${id}`);
const addPage = ()=> http.post(`${urls.PAGES}`);

const deletePage = id => http.delete(`${urls.PAGES}/${id}`);

const editPage = (id, updateUser) =>
   http.put(`${urls.PAGES}/${id}`, updateUser);

export { getPages, getPage, deletePage, editPage,addPage };
