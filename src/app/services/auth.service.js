import http from "./http.service";
import urls from "./urls";

const register = newUser => {
   try {
      return http.post(urls.REGISTER, newUser);
   } catch (e) {
      return false;
   }
};

export { register };
