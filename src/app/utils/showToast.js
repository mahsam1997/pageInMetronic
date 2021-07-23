import { toast } from "react-toastify";

const showToast = message => {
   if (Array.isArray(message)) {
      message.forEach(m => {
         toast[m.type || "success"](m.text);
      });
   } else {
      toast[message.type || "success"](message.text);
   }
};

export default showToast;
