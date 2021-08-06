export const defaultSorted = [{ dataField: "_id", order: "asc" }];

export const sizePerPageList = [
   { text: "10", value: 10 },
   { text: "25", value: 25 },
   { text: "50", value: 50 },
   { text: "100", value: 100 },
   { text: "150", value: 150 },
   { text: "200", value: 200 },
];

export const initialFilter = {
   filter: {
      fullName: "",
      email: "",
      mobile: "",
   },
   sortOrder: "asc", // asc||desc
   sortField: "_id",
   pageNumber: 1,
   pageSize: 10,
};
