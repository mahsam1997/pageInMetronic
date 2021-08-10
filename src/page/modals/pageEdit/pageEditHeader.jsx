import React, { useState, useEffect } from "react";
import { CardHeader} from "../../../_metronic/_partials/controls/Card";
import { CardHeaderTitle} from "../../../_metronic/_partials/controls/Card";

// import { Modal } from "react-bootstrap";
// import { ModalProgressBar } from "../../../_metronic/_partials/controls";
// import { useTranslation } from "react-i18next";

function PageEditHeader({ id, pageForEdit, loading }) {
   const [title, setTitle] = useState("");
   // const { t } = useTranslation();

   // Title Form
   useEffect(() => {
      let _title = id ? "" : "صفحه جدید";
      if (pageForEdit && id) {
         _title = `${"ویرایش صفحه"}'${pageForEdit.title}'`;
      }

      setTitle(_title);
      // eslint-disable-next-line
   }, [pageForEdit, loading]);

   return (
      <>
         {loading}
         <CardHeader closeButton>
            <CardHeaderTitle id="example-modal-sizes-title-lg">
               {title}
            </CardHeaderTitle>
         </CardHeader>
      </>
   );
}

export default PageEditHeader;
