import defaultAxios from "./defaultAxios";
// import checkToken from "../utils/checkToken";
/**
 * http service: (axios wrapper) generates get, put, delete and post requests with and without authorization header
 * @param {String} url, url of the request
 * @param {Object} data, data of the request
 * @param {Boolean} setAuthorization, whether or not the request needs header authorization
 * @function generateRequest : generates http request, this function avoids repeating same logic for different types of request
 * @returns {Function} returns generated request
 */

const generateRequest = async (
   func,
   args,
   setAuthorization,
   recaptchaToken
) => {
   if (recaptchaToken) {
      const newConfig = {
         ...defaultAxios.instance.defaults,
         headers: {
            ...defaultAxios.instance.defaults.headers,
            "recaptcha-token": recaptchaToken,
         },
      };
      if (!setAuthorization)
         return defaultAxios.instance[func](...args, newConfig);
      // await checkToken();
      return defaultAxios.instanceWithAuthorization[func](...args, newConfig);
   }
   if (!setAuthorization) {
      return defaultAxios.instance[func](...args);
   }
   // await checkToken();
   return defaultAxios.instanceWithAuthorization[func](...args);
};

const http = {
   get: (url, setAuthorization = true, recaptchaToken = false) => {
      return generateRequest("get", [url], setAuthorization, recaptchaToken);
   },
   put: (url, data, setAuthorization = true, recaptchaToken = false) => {
      return generateRequest(
         "put",
         [url, data],
         setAuthorization,
         recaptchaToken
      );
   },
   delete: (url, setAuthorization = true, recaptchaToken = false) => {
      return generateRequest("delete", [url], setAuthorization, recaptchaToken);
   },
   post: (url, data, setAuthorization = true, recaptchaToken = false) => {
      return generateRequest(
         "post",
         [url, data],
         setAuthorization,
         recaptchaToken
      );
   },
};

export default http;
