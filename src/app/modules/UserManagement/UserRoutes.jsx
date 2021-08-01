import React from "react";
import { Route, Redirect } from "react-router-dom";
import UsersLoadingModal from "../../modals/UsersLoadingModal";
import UserEditModal from "../../modals/UserEditModal/UserEditModal";
import UserDeleteModal from "../../modals/UserDeleteModal";
import UsersDeleteModal from "../../modals/UsersDeleteModal";
import { UsersUIProvider } from "../../context/UsersUIContext";
import UsersCard from "../../components/UsersCard";

import routes from "../../router/routes.json";

function UserRoutes({ history }) {
   const usersUIEvents = {
      openEditUserModal: id => {
         history.push(`${routes.USERS}/${id}/edit`);
      },
      openDeleteUserModal: id => {
         history.push(`${routes.USERS}/${id}/delete`);
      },
      openDeleteUsersModal: () => {
         history.push(routes.USERS_DELETE);
      },
   };

   return (
      <UsersUIProvider usersUIEvents={usersUIEvents}>
         <UsersLoadingModal />
         <Route path={routes.USER_EDIT}>
            {({ match }) => (
               <UserEditModal
                  show={match != null}
                  id={match && match.params.id}
                  onHide={() => {
                     history.push(routes.USERS);
                  }}
               />
            )}
         </Route>
         <Route path={routes.USER_DELETE}>
            {({ match }) => (
               <UserDeleteModal
                  show={match != null}
                  id={match && match.params.id}
                  onHide={() => {
                     history.push(routes.USERS);
                  }}
               />
            )}
         </Route>
         <Route path={routes.USERS_DELETE}>
            {({ match }) => (
               <UsersDeleteModal
                  show={match != null}
                  id={match && match.params.id}
                  onHide={() => {
                     history.push(routes.USERS);
                  }}
               />
            )}
         </Route>
         <Redirect exact={true} to={routes.USERS} />
         <UsersCard />
      </UsersUIProvider>
   );
}

export default UserRoutes;
