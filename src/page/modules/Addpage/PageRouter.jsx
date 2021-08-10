import React from "react";
import { Route, Redirect } from "react-router-dom";
import PageLoadingModal from "../../modals/PageLoadingModal";
import PageCreate from "../../modals/pageCreate/pageCreate";
import PageEdit from "../../modals/pageEdit/pageEdit";
import PageDeleteModal from "../../modals/pageDeleteModal";
import PagesDeleteModal from "../../modals/pagesDeleteModal";
import { PagesListUIProvider } from "../../context/pageListUiContex";
import PagesCard from "../../components/pagesCard";
import routes from "../../../app/router/routes.json";

function AddPageRoutes({ history }) {
   console.log("component render");
   const pageListUIEvents = {
      openCreatePage: () => {
         history.push(routes.PAGE_CREAT);
      },
      openEditPage: id => {
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
         <PageLoadingModal />
         <Route path={routes.PAGE_CREAT}>
            {({ match }) => {
               return (
                  <PageCreate
                     show={match != null}
                     id={match && match.params.id}
                     onHide={() => {
                        history.push(routes.PAGES);
                     }}
                  />
               );
            }}
         </Route>
         <Route path={routes.PAGE_EDIT}>
            {({ match }) => {
               console.log("Match", match);
               return (
                  <PageEdit
                     show={match != null}
                     id={match && match.params.id}
                     onHide={() => {
                        history.push(routes.PAGES);
                     }}
                  />
               );
            }}
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
         <Route path={routes.PAGES}>
            {({ match }) => (match.isExact ? <PagesCard /> : null)}
         </Route>
      </PagesListUIProvider>
   );
}

export default AddPageRoutes;
