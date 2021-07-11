/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Switch, Redirect } from "react-router-dom";
import { FormattedMessage } from "react-intl";

// import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ContentRoute } from "../../../../_metronic/layout";
import Login from "./Login";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";

import logo from "../../../Assets/images/logo.jpg";
import pic from "../../../Assets/images/pic-aside.jpg";

export function AuthPage() {
   return (
      <>
         <div className="d-flex flex-column flex-root">
            {/*begin::Login*/}
            <div
               className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
               id="kt_login"
            >
               {/*begin::Aside*/}
               <div
                  className="login-aside d-flex flex-column justify-content-between"
                  style={{
                     backgroundColor: "#ffffff",
                  }}
               >
                  {/*begin: Aside Container*/}
                  <div className="d-flex flex-row-fluid flex-column align-items-center">
                     <div className="aside-top">
                        <img src={logo} alt="logo" className="aside-logo" />

                        <div className="aside-title">
                           <FormattedMessage id="AUTH.AUTHPAGE.TITLE.1" />
                           <br />
                           <FormattedMessage id="AUTH.AUTHPAGE.TITLE.2" />
                        </div>
                     </div>
                  </div>
                  {/*end: Aside Container*/}

                  <img src={pic} alt="aside pic" className="aside-pic" />
               </div>
               {/*begin::Aside*/}

               {/*begin::Content*/}
               <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden">
                  {/* begin::Content body */}
                  <div className="d-flex flex-column-fluid flex-center mt-30 mt-lg-0">
                     <Switch>
                        <ContentRoute path="/auth/login" component={Login} />
                        <ContentRoute
                           path="/auth/registration"
                           component={Registration}
                        />
                        <ContentRoute
                           path="/auth/forgot-password"
                           component={ForgotPassword}
                        />
                        <Redirect from="/auth" exact={true} to="/auth/login" />
                        <Redirect to="/auth/login" />
                     </Switch>
                  </div>
                  {/*end::Content body*/}
               </div>
               {/*end::Content*/}
            </div>
            {/*end::Login*/}
         </div>
      </>
   );
}
