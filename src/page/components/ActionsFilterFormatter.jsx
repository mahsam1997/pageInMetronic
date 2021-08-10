// // please be familiar with react-bootstrap-table-next column formaters
// // https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
// /* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
// import React, { useMemo } from "react";
// import { usePageListUIContext } from "../context/pageListUiContex";

// import { useTranslation } from "react-i18next";

// import SVG from "react-inlinesvg";
// import { toAbsoluteUrl } from "../../_metronic/_helpers";

// import i18next from "i18next";

// function ActionsFilterFormatter() {
//    const pageListUIContext = usePageListUIContext();
//    const pagesUIProps = useMemo(() => {
//       return {
//          ids: pageListUIContext.ids,
//          setIds: pageListUIContext.setIds,
//          openCreatPageModal: pageListUIContext.openCreatPageModal,
//       };
//    }, [pageListUIContext]);

//    const { t } = useTranslation();
//    return (
//       <>
//          <a
//             title={i18next.t("messages.USERS.EDIT_USER")}
//             className="btn btn-icon btn-light btn-hover-primary btn-xl mt-7"
//             onClick={pagesUIProps.openCreatPageModal}
//          >
//             <span className="svg-icon svg-icon-xl svg-icon-primary">
//                <SVG
//                   src={toAbsoluteUrl("/media/svg/icons/Files/Folder-plus.svg")}
//                />
//             </span>
//          </a>
//       </>
//    );
// }

// export default ActionsFilterFormatter;
// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../_metronic/_helpers";

import i18next from "i18next";

function ActionsFilterFormatter(
   pages,
   cellContent,
   row,
   rowIndex,
   { openCreatePage }
) {
   const isRemoved = pages[rowIndex].status === "removed";
   return (
      <>
         <a
            title={i18next.t("messages.USERS.EDIT_USER")}
            className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3"
            onClick={() => openCreatePage()}
            >
            <span className="svg-icon svg-icon-xl svg-icon-primary">
               <SVG
                  src={toAbsoluteUrl("/media/svg/icons/Files/Folder-plus.svg")}
               />
            </span>
         </a>
      </>
   );
}

export default ActionsFilterFormatter;

// please be familiar with react-bootstrap-table-next column formaters
// https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html?selectedKind=Work%20on%20Columns&selectedStory=Column%20Formatter&full=0&addons=1&stories=1&panelRight=0&addonPanel=storybook%2Factions%2Factions-panel
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
// import React from "react";
// import SVG from "react-inlinesvg";
// import { toAbsoluteUrl } from "../../_metronic/_helpers";

// import i18next from "i18next";

// function ActionsFilterFormatter(users,
//     cellContent,
//     row,
//     rowIndex,
//     {openCreatPageModal} ) {
//    return (
//       <>
//          <a
//             title={i18next.t("messages.USERS.EDIT_USER")}
//             className="btn btn-icon btn-light btn-hover-primary btn-md mx-3"
//             onClick={() => openCreatPageModal(row["_id"])}
//          >
//             <span className="svg-icon svg-icon-md svg-icon-primary">
//                <SVG
//                   src={toAbsoluteUrl(
//                      "/media/svg/icons/Communication/Write.svg"
//                   )}
//                />
//             </span>
//          </a>
//       </>
//    );
// }

// export default ActionsFilterFormatter;
