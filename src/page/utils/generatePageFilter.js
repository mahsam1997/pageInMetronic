const generatePageFilter = filter => {
   // const title = filter.title ? filter.title : "";
   // const status = filter.status ? filter.status : "";
   // const filterText = filter.Key ? filter.Key : "";
   // const language = filter.language ? filter.language : "";
   // const filterText1 = filter.searchKeyByTitle ? filter.searchKeyByTitle : "";
   // const filterText2 = filter.searchKeyByKey ? filter.searchKeyByKey : "";

   // const getTitleQuery = () => title && `&search.title=${title}`;
   // const getStatusQuery = () => status && `&search.status=${status}`;
   // const getFilterTextQuery = () => filterText && `&search.filterText=${filterText}`;
//    const getlanguageQuery = () => language && `&search.language=${language}`;
//    const getFilterTextQuery = () => {
//       if (filter.searchKeyByTitle === "title") {
//          return filterText1 && `&search.title=${filterText1}`;
//       } else {
//          return filterText1 && `${filter.searchKeyByKey}=${filterText1}`;
//       }
//    };
//    const getFilterTextQuery2=()=>{
//    if (filter.searchKeyByKey === "Key") {
//       return filterText1 && `&search.Key=${filterText2}`;
//    } else {
//       return filterText2 && `${filter.searchKeyByKey}=${filterText2}`;
//    }
//    }
//    // return `${getTitleQuery()}${getFilterTextQuery()}${getlanguageQuery()}`;
//     return `${getFilterTextQuery2()}${getFilterTextQuery()}${getlanguageQuery()}`;

   const language = filter.language ? filter.language : "";
   const status = filter.status ? filter.status : "";
   const filterText = filter[filter.searchKey] ? filter[filter.searchKey] : "";

   const getlanguageQuery = () => language && `&language=${language}`;
   const getStatusQuery = () => status && `&status=${status}`;
   const getFilterTextQuery = () => {
      if (filter.searchKey === "key") {
         return filterText && `&search[key]=${filterText}`;
      } else {
         return filterText && `&search[${filter.searchKey}]=${filterText}`;
      }
   };

   return `${getlanguageQuery()}${getStatusQuery()}${getFilterTextQuery()}`;
};


export default generatePageFilter;
// ${getStatusQuery()}