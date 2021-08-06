import React from "react";
import { Route, Redirect } from "react-router-dom";
import PageLoadingModal from "../../modals/PageLoadingModal";
import PageCreatModal from "../../modals/pageCreateModal/pageCreateModal";
import PageEditModal from "../../modals/pageEditModal/pageEditModal";
import PageDeleteModal from "../../modals/pageDeleteModal";
import PagesDeleteModal from "../../modals/pagesDeleteModal";
import { PagesListUIProvider } from "../../context/pageListUiContex";
import PagesCard from "../../components/pagesCard";
import routes from "../../../router/routes.json";

function AddPageRoutes({ history }) {
   console.log("component render");
   const pageListUIEvents = {
      // openAddPageModal: () => {
      //    history.push(routes.PAGE_ADD);
      // },
      // openCreatPageModal: () => {
      //    history.push(routes.PAGE_CREAT);
      // },
      openEditPageModal: id => {
         history.push(`${routes.PAGES}/${id}/edit`);
      },

      openDeletePageModal: id => {
         history.push(`${routes.PAGES}/${id}/delete`);
      },
      openDeletePagesModal: () => {
         history.push(routes.PAGES_DELETE);
      },
   };

   return (
      <PagesListUIProvider pageListUIEvents={pageListUIEvents}>
         < PageLoadingModal/>
         {/* <Route path={routes.PAGE_ADD}>
            {({ match }) => (
               <AddPageModal
                  show={match != null}
                  id={match && match.params.id}
                  onHide={() => {
                     history.push(routes.PAGES);
                  }}
               />
            )}
         </Route> */}
         <Route path={routes.PAGE_CREAT}>
            {({ match }) => (
               <PageCreatModal
                  show={match != null}
                  id={match && match.params.id}
                  onHide={() => {
                     history.push(routes.PAGES);
                  }}
               />
            )}
         </Route>
         <Route path={routes.PAGE_EDIT}>
            {({ match }) => (
               <PageEditModal
                  show={match != null}
                  id={match && match.params.id}
                  onHide={() => {
                     history.push(routes.PAGES);
                  }}
               />
            )}
         </Route>
         <Route path={routes.PAGE_DELETE}>
            {({ match }) => (
               <PageDeleteModal
                  show={match != null}
                  id={match && match.params.id}
                  onHide={() => {
                     history.push(routes.PAGES);
                  }}
               />
            )}
         </Route>
         <Route path={routes.PAGES_DELETE}>
            {({ match }) => (
               <PagesDeleteModal
                  show={match != null}
                  id={match && match.params.id}
                  onHide={() => {
                     history.push(routes.PAGES);
                  }}
               />
            )}
         </Route>
         <Redirect exact={true} to={routes.PAGES} />
         <PagesCard />
      </PagesListUIProvider>
   );
}

export default AddPageRoutes;
