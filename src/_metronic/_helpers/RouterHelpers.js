import * as utils from "./LocalStorageHelpers";
import i18next from "i18next";
import routes from "../../app/router/routes.json";

const localStorageLastLocationKey = "metronic-lastLocation";

function acceptLocation(lastLocation) {
   if (
      lastLocation &&
      lastLocation.pathname &&
      lastLocation.pathname !== "/" &&
      lastLocation.pathname.indexOf("auth") === -1 &&
      lastLocation.pathname !== routes.LOGOUT
   ) {
      return true;
   }

   return false;
}

export function saveLastLocation(lastLocation) {
   if (acceptLocation(lastLocation)) {
      utils.setStorage(
         localStorageLastLocationKey,
         JSON.stringify(lastLocation),
         120
      );
   }
}

export function forgotLastLocation() {
   utils.removeStorage(localStorageLastLocationKey);
}

export function getLastLocation() {
   const defaultLocation = {
      pathname: "/",
      title: i18next.t("DEFAULT.DASHBOARD"),
   };
   const localStorateLocations = utils.getStorage(localStorageLastLocationKey);
   if (!localStorateLocations) {
      return { pathname: "/", title: i18next.t("DEFAULT.DASHBOARD") };
   }

   try {
      const result = JSON.parse(localStorateLocations);
      return result;
   } catch (error) {
      console.error(error);
      return defaultLocation;
   }
}

export function getCurrentUrl(location) {
   return location.pathname.split(/[?#]/)[0];
}

export function checkIsActive(location, url) {
   const current = getCurrentUrl(location);
   if (!current || !url) {
      return false;
   }

   if (current === url) {
      return true;
   }

   if (current.indexOf(url) > -1) {
      return true;
   }

   return false;
}
