import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "../enums/usersUIHelpers";

const UsersUIContext = createContext();

export function useUsersUIContext() {
   return useContext(UsersUIContext);
}

export const UsersUIConsumer = UsersUIContext.Consumer;

export function UsersUIProvider({ usersUIEvents, children }) {
   const [queryParams, setQueryParamsBase] = useState(initialFilter);
   const [ids, setIds] = useState([]);
   const [isLoading, setIsLoading] = useState(false);

   const setQueryParams = useCallback(nextQueryParams => {
      setQueryParamsBase(prevQueryParams => {
         if (isFunction(nextQueryParams)) {
            nextQueryParams = nextQueryParams(prevQueryParams);
         }

         if (isEqual(prevQueryParams, nextQueryParams)) {
            return prevQueryParams;
         }

         return nextQueryParams;
      });
   }, []);

   const initUser = {
      _id: undefined,
      profile: {
         fullName: "",
      },
      email: "",
      mobile: "",
      role: "",
      status: "",
   };

   const value = {
      isLoading,
      setIsLoading,
      //
      queryParams,
      setQueryParamsBase,
      ids,
      setIds,
      setQueryParams,
      initUser,
      openEditUserDialog: usersUIEvents.openEditUserDialog,
      openDeleteUserDialog: usersUIEvents.openDeleteUserDialog,
      openDeleteUsersDialog: usersUIEvents.openDeleteUsersDialog,
   };

   return (
      <UsersUIContext.Provider value={value}>
         {children}
      </UsersUIContext.Provider>
   );
}
