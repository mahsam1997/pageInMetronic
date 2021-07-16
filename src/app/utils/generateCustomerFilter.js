const generateCustomerFilter = filter => {
   const roll = filter.roll ? filter.roll : "";
   const status = filter.status ? filter.status : "";
   const fullName = filter.fullName ? filter.fullName : "";
   const email = filter.email ? filter.email : "";
   const mobile = filter.mobile ? filter.mobile : "";
   //   return `${roll && `&search[roll]=${roll}`}${status &&
   //      `&search[status]=${status}`}${fullName &&
   //      `search[profile.fullName]=${fullName}`}${email &&
   //      `&search[email]=${email}`}${mobile && `&search[mobile]=${mobile}`}`;

   return `${roll && `&search[roll]=${roll}`}${status &&
      `&search[status]=${status}`}`;
};

export default generateCustomerFilter;
