const generateCustomerFilter = filter => {
   const roll = filter.roll ? filter.roll : "";
   const status = filter.status ? filter.status : "";
   const filterText = filter[filter.searchKey] ? filter[filter.searchKey] : "";

   const getRollQuery = () => roll && `&search[roll]=${roll}`;
   const getStatusQuery = () => status && `&search[status]=${status}`;
   const getFilterTextQuery = () =>
      filterText && `&search[${filter.searchKey}]=${filterText}`;

   return `${getRollQuery()}${getStatusQuery()}${getFilterTextQuery()}`;
};

export default generateCustomerFilter;
