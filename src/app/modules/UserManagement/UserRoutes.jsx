import React from "react";
import { Route, Redirect } from "react-router-dom";
import UsersLoadingDialog from "../../modals/UsersLoadingDialog";
import UserEditDialog from "../../modals/UserEditModal/UserEditModal";
import UserDeleteDialog from "../../modals/UserDeleteDialog";
import UsersDeleteDialog from "../../modals/UsersDeleteDialog";
import { UsersUIProvider } from "../../context/UsersUIContext";
import UsersCard from "../../components/UsersCard";

import routes from "../../router/routes.json";

function UserRoutes({ history }) {
   const usersUIEvents = {
      openEditUserDialog: id => {
         history.push(`${routes.USERS}/${id}/edit`);
      },
      openDeleteUserDialog: id => {
         history.push(`${routes.USERS}/${id}/delete`);
      },
      openDeleteUsersDialog: () => {
         history.push(routes.USERS_DELETE);
      },
   };

   return (
      <UsersUIProvider usersUIEvents={usersUIEvents}>
         <UsersLoadingDialog />
         <Route path={routes.USER_EDIT}>
            {({ match }) => (
               <UserEditDialog
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
               <UserDeleteDialog
                  show={match != null}
                  onHide={() => {
                     history.push(routes.USERS);
                  }}
               />
            )}
         </Route>
         <Route path={routes.USERS_DELETE}>
            {({ match }) => (
               <UsersDeleteDialog
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
