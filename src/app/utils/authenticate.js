// @ts-check

import { addAuthorization } from "../services/defaultAxios";
import storageHelper from "./storageHelper";

const isAuthenticate = () => {
   const id = storageHelper.getItem("id");
   const refresh = storageHelper.getItem("refresh");
   const role = storageHelper.getItem("role");
   const token = storageHelper.getItem("token");

   return id && refresh && role && token ? true : false;
};

/**
 * @typedef {'localStorage' | 'sessionStorage'} SaveType
 *
 * @param {string} id
 * @param {string} refresh
 * @param {string} role
 * @param {string} token
 * @param {SaveType} saveType
 */

const setAuthenticate = async (
   id,
   refresh,
   role,
   token,
   saveType = "localStorage"
) => {
   storageHelper.setItem("id", id, saveType);
   storageHelper.setItem("refresh", refresh, saveType);
   storageHelper.setItem("role", role, saveType);
   storageHelper.setItem("token", token, saveType);
   addAuthorization();
};

const clearAuthenticate = () => {
   storageHelper.removeItem("id");
   storageHelper.removeItem("refresh");
   storageHelper.removeItem("role");
   storageHelper.removeItem("token");
};

export { isAuthenticate, setAuthenticate, clearAuthenticate };
