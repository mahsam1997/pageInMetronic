import http from "./http.service";
import urls from "./urls.json";

const register = newUser => {
   try {
      return http.post(urls.REGISTER, newUser);
   } catch (e) {
      return false;
   }
};

const forgotPassword = email => {
   try {
      return http.post(urls["FORGET.PASSWORD"], email);
   } catch (e) {
      return false;
   }
};

const login = user => {
   try {
      return http.post(urls.LOGIN, user);
   } catch (e) {
      return false;
   }
};

export { register, forgotPassword, login };
