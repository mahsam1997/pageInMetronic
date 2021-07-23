import http from "./http.service";

import generateCustomerFilter from "../utils/generateCustomerFilter";

import urls from "./urls.json";

const getUsers = (limit, pageNumber, filter) =>
   http.get(
      `${urls.USERS}?limit=${limit}&page=${pageNumber}${generateCustomerFilter(
         filter
      )}`
   );

const getUser = id => http.get(`${urls.USERS}/${id}`);

const deleteUser = id => http.delete(`${urls.USERS}/${id}`);

const editUser = (id, updateUser) =>
   http.put(`${urls.USERS}/${id}`, updateUser);

export { getUsers, getUser, deleteUser, editUser };
