import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "../enums/pagesUIHelpers";

const PageListUIContext = createContext();

export function usePageListUIContext() {
   return useContext(PageListUIContext);
}

export const PageListUIConsumer = PageListUIContext.Consumer;

export function PagesListUIProvider({pageListUIEvents, children }) {
   const [queryParams, setQueryParamsBase] = useState(initialFilter);
   const [ids, setIds] = useState([]);
   const [isModalClose, setIsModalClose] = useState(false);
   const [isModalLoading, setIsModalLoading] = useState(false);

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
      isModalClose,
      setIsModalClose,
      isModalLoading,
      setIsModalLoading,
      //
      queryParams,
      setQueryParamsBase,
      ids,
      setIds,
      setQueryParams,
      initUser,
      openEditPageModal:pageListUIEvents.openEditPageModal,
      openDeletePageModal: pageListUIEvents.openDeletePageModal,
      openDeletePagesModal: pageListUIEvents.openDeletePagesModal,
   };

   return (
      <PageListUIContext.Provider value={value}>
         {children}
      </PageListUIContext.Provider>
   );
}
