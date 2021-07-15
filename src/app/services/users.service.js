import http from "./http.service";
import urls from "./urls.json";

const getUsers = () => http.get(urls.GET_USERS);

const deleteUsers = id => http.delete(`${urls.DELETE_USERS}/${id}`);

const getUser = id => http.get(`${urls.GET_USERS}/${id}`);

export { getUsers, getUser, deleteUsers };
