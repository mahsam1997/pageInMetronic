import http from "./http.service";

import generateCustomerFilter from "../utils/generateCustomerFilter";

import urls from "./urls.json";

const getUsers = (limit, pageNumber, filter) => {
   console.log(
      `${
         urls.GET_USERS
      }?limit=${limit}&page=${pageNumber}${generateCustomerFilter(filter)}`
   );

   return http.get(
      `${
         urls.GET_USERS
      }?limit=${limit}&page=${pageNumber}${generateCustomerFilter(filter)}`
   );
};

const getUser = id => http.get(`${urls.GET_USERS}/${id}`);

const deleteUser = id => http.delete(`${urls.DELETE_USERS}/${id}`);

const editUser = (id, updateUser) =>
   http.put(`${urls.EDIT_USERS}/${id}`, updateUser);

export { getUsers, getUser, deleteUser, editUser };
