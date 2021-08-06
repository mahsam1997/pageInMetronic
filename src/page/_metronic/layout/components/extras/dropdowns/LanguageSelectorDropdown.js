/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import { toAbsoluteUrl } from "../../../../_helpers";
import { DropdownItemToggler } from "../../../../_partials/dropdowns";

import { useTranslation } from "react-i18next";
import { getLanguageList } from "../../../../../app/services/language.service";

export function LanguageSelectorDropdown({ overlayPlacement, alignRight }) {
   const [languageList, setLanguageList] = useState([]);
   const { t, i18n } = useTranslation();
   const currentLanguage = languageList.find(x => x.lang === i18n.language);

   useEffect(() => {
      const getList = async () => {
         const response = await getLanguageList();
         if (response?.data?.success) {
            const list = response.data.data.map(lng => ({
               ...lng,
               lang: lng.language,
               flag: toAbsoluteUrl(`/media/svg/flags/${lng.flag}`),
            }));
            setLanguageList(list);
         }
      };
      getList();
   }, []);

   const handleChangeLanguage = newLng => {
      i18n.changeLanguage(newLng);
      window.location.reload();
   };

   return (
      languageList.length > 0 && (
         <Dropdown
            drop="up"
            alignRight={alignRight}
            style={{ maxWidth: "fit-content" }}
         >
            <Dropdown.Toggle
               as={DropdownItemToggler}
               id="dropdown-toggle-my-cart"
               className="mb-2"
            >
               <OverlayTrigger
                  placement={overlayPlacement}
                  overlay={
                     <Tooltip
                        id="language-panel-tooltip"
                        style={{ fontFamily: "Vazir" }}
                     >
                        {t("messages.SELECT.LANGUAGE")}
                     </Tooltip>
                  }
               >
                  <div className="btn btn-icon btn-clean btn-lg">
                     <img
                        className="w-25px h-25px w-lg-30px h-lg-30px rounded-circle"
                        src={currentLanguage.flag}
                        alt={currentLanguage.name}
                     />
                  </div>
               </OverlayTrigger>
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-anim-up dropdown-menu-sm dropdown-menu-left">
               <ul className="navi navi-hover py-4">
                  {languageList.map(language => (
                     <li
                        key={language.lang}
                        className={clsx("navi-item", {
                           active: language.lang === currentLanguage.lang,
                        })}
                     >
                        <a
                           href="#"
                           onClick={() => handleChangeLanguage(language.lang)}
                           className="navi-link"
                        >
                           <span className="symbol symbol-20 mr-3">
                              <img src={language.flag} alt={language.name} />
                           </span>
                           <span className="navi-text">{language.name}</span>
                        </a>
                     </li>
                  ))}
               </ul>
            </Dropdown.Menu>
         </Dropdown>
      )
   );
}

LanguageSelectorDropdown.defaultProps = {
   alignRight: true,
};
