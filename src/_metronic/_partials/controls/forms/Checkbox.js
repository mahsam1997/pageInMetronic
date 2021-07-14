import React from "react";

export function Checkbox({ isSelected, onChange, children, id }) {
   return (
      <>
         <input type="checkbox" style={{ display: "none" }} id={id} />
         <label className="checkbox checkbox-lg checkbox-single ltr">
            <input type="checkbox" checked={isSelected} onChange={onChange} />
            <span />
            <main>{children}</main>
         </label>
      </>
   );
}
