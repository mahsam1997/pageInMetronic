import axios from "axios";
import errorHandler from "../utils/errorHandler";

const instance = axios.create();
const instanceWithAuthorization = axios.create();

export const setConfig = () => {
   instance.defaults.baseURL = process.env.REACT_APP_BASE_URL;
   instanceWithAuthorization.defaults.baseURL = process.env.REACT_APP_BASE_URL;
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

setConfig();
axiosSetup(instance);
axiosSetup(instanceWithAuthorization);

const defaultAxios = {
   axiosSetup,
   instance,
   instanceWithAuthorization,
   setConfig,
};
export default defaultAxios;
