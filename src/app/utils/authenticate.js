const isAuthenticate = () => {
   const id = localStorage.getItem("id");
   const refresh = localStorage.getItem("refresh");
   const role = localStorage.getItem("role");
   const token = localStorage.getItem("token");

   return id && refresh && role && token ? true : false;
};

const setAuthenticate = (id, refresh, role, token) => {
   // new Promise((resolve,reject)=>{
   localStorage.setItem("id", id);
   localStorage.setItem("refresh", refresh);
   localStorage.setItem("role", role);
   localStorage.setItem("token", token);
   // })
   // try {

   // } catch (e) {
   //    console.log(e);
   // }
};

const clearAuthenticate = () => {
   // return new Promise((resolve, reject) => {
   localStorage.removeItem("id");
   localStorage.removeItem("refresh");
   localStorage.removeItem("role");
   localStorage.removeItem("token");

   // if (!isAuthenticate()) {
   //    resolve();
   // }
   // });
};

export { isAuthenticate, setAuthenticate, clearAuthenticate };
