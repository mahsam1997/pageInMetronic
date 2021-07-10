import React from "react";

export function Checkbox({ isSelected, onChange, children, id }) {
  return (
    <>
      <input type="checkbox" style={{ display: "none" }} id={id} />
      <label className="checkbox checkbox-lg checkbox-single">
        <input type="checkbox" checked={isSelected} onChange={onChange} />
        {children}
        <span />
      </label>
    </>
  );
}
