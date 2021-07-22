const generateCustomerFilter = filter => {
   const role = filter.role ? filter.role : "";
   const status = filter.status ? filter.status : "";
   const filterText = filter[filter.searchKey] ? filter[filter.searchKey] : "";

   const getRoleQuery = () => role && `&search[role]=${role}`;
   const getStatusQuery = () => status && `&search[status]=${status}`;
   const getFilterTextQuery = () => {
      if (filter.searchKey === "fullName") {
         return filterText && `&search[profile.fullName]=${filterText}`;
      } else {
         return filterText && `&search[${filter.searchKey}]=${filterText}`;
      }
   };

   return `${getRoleQuery()}${getStatusQuery()}${getFilterTextQuery()}`;
};

export default generateCustomerFilter;
