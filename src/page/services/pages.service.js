import http from "./http.service";

import generateUserFilter from "../utils/generateUserFilter";

import urls from "./urls.json";

const getPages = (limit, pageNumber, filter, sortOrder, sortField) =>
   http.get(
      `${urls.USERS}?limit=${limit}&page=${pageNumber}${generateUserFilter(
         filter
      )}&sort[${sortField}]=${sortOrder === "asc" ? 1 : -1}`
   );

const getPage = id => http.get(`${urls.PAGES}/${id}`);

const deletePage = id => http.delete(`${urls.PAGES}/${id}`);

const editPage = (id, updateUser) =>
   http.put(`${urls.PAGES}/${id}`, updateUser);

export { getPages, getPage, deletePage, editPage };
