import axios from "axios";
import errorHandler from "../utils/errorHandler";
import storageHelper from "../utils/storageHelper";

const instance = axios.create();
const instanceWithAuthorization = axios.create();

export const setConfig = () => {
   instance.defaults.baseURL = process.env.REACT_APP_BASE_URL;
   instanceWithAuthorization.defaults.baseURL = process.env.REACT_APP_BASE_URL;
};

export const addAuthorization = () => {
   const token = storageHelper.getItem("token");

   if (token)
      instanceWithAuthorization.defaults.headers.common["Authorization"] =
         "Bearer " + token;
};

const language =
   JSON.parse(localStorage.getItem("i18nConfig"))?.selectedLang || "en";

export const addLanguage = () => {
   instance.defaults.headers.common["Accept-Language"] = language;
   instanceWithAuthorization.defaults.headers.common[
      "Accept-Language"
   ] = language;
};

export const axiosSetup = axiosInstance => {
   axiosInstance.interceptors.request.use(
      req => {
         return req;
      },
      err => {
         return err;
      }
   );

   axiosInstance.interceptors.response.use(
      res => {
         return res;
      },
      error => errorHandler(error)
   );
};

addLanguage();
addAuthorization();
setConfig();
addAuthorization();
axiosSetup(instance);
axiosSetup(instanceWithAuthorization);

const defaultAxios = {
   addAuthorization,
   axiosSetup,
   instance,
   instanceWithAuthorization,
   setConfig,
};
export default defaultAxios;
