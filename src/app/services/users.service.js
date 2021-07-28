import http from "./http.service";

import generateUserFilter from "../utils/generateUserFilter";

import urls from "./urls.json";

const getUsers = (limit, pageNumber, filter, sortOrder, sortField) =>
   http.get(
      `${urls.USERS}?limit=${limit}&page=${pageNumber}${generateUserFilter(
         filter
      )}&sort[${sortField}]=${sortOrder === "asc" ? 1 : -1}`
   );

const getUser = id => http.get(`${urls.USERS}/${id}`);

const deleteUser = id => http.delete(`${urls.USERS}/${id}`);

const editUser = (id, updateUser) =>
   http.put(`${urls.USERS}/${id}`, updateUser);

export { getUsers, getUser, deleteUser, editUser };
