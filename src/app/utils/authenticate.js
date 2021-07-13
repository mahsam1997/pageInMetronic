const isAuthenticate = () => {
   const id = localStorage.getItem("id");
   const refresh = localStorage.getItem("refresh");
   const role = localStorage.getItem("role");
   const token = localStorage.getItem("token");

   return id && refresh && role && token ? true : false;
};

const setAuthenticate = async (id, refresh, role, token) => {
   localStorage.setItem("id", id);
   localStorage.setItem("refresh", refresh);
   localStorage.setItem("role", role);
   localStorage.setItem("token", token);
};

const clearAuthenticate = () => {
   localStorage.removeItem("id");
   localStorage.removeItem("refresh");
   localStorage.removeItem("role");
   localStorage.removeItem("token");
};

export { isAuthenticate, setAuthenticate, clearAuthenticate };
