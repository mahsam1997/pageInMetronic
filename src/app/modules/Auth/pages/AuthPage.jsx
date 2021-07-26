/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Login from "./Login/index";
import Registration from "./Registration";
import ForgotPassword from "./ForgotPassword";
import "../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss";

import { useTranslation } from "react-i18next";

import AuthFooter from "../../../components/AuthFooter";
import routes from "../../../router/routes";

import logo from "../../../Assets/images/logo.jpg";
import pic from "../../../Assets/images/pic-aside.jpg";

export function AuthPage() {
   const { t } = useTranslation();

   return (
      <>
         <div className="d-flex flex-column flex-root">
            {/*begin::Login*/}
            <div
               className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-column-fluid bg-white"
               id="kt_login"
            >
               {/* begin::Aside */}
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
                           {t("messages.AUTH.AUTHPAGE.TITLE.1")}
                           <br />
                           {t("messages.AUTH.AUTHPAGE.TITLE.2")}
                        </div>
                     </div>
                  </div>
                  {/*end: Aside Container*/}

                  <img src={pic} alt="aside pic" className="aside-pic" />
               </div>
               {/* begin::Aside */}
               {/*begin::Content*/}
               <div className="d-flex flex-column flex-row-fluid position-relative p-7 overflow-hidden">
                  {/* begin::Content body */}
                  <div className="d-flex flex-column-fluid flex-center  mt-30 mt-lg-0">
                     <Switch>
                        <Route path={routes.LOGIN} component={Login} />
                        <Route
                           path={routes.REGISTER}
                           component={Registration}
                        />
                        <Route
                           path={routes.FORGETPASS}
                           component={ForgotPassword}
                        />
                        <Redirect
                           from={routes.AUTH}
                           exact={true}
                           to={routes.LOGIN}
                        />
                        <Redirect to={routes.LOGIN} />
                     </Switch>
                  </div>

                  <AuthFooter />
               </div>
               {/*end::Content*/}
            </div>
            {/*end::Login*/}
         </div>
      </>
   );
}
