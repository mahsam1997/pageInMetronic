import React from "react";

const TextError = errorMessage => (
   <div className="fv-plugins-message-container mt-1 text-error">
      <div className="fv-help-block">{errorMessage}</div>
   </div>
);

export default TextError;
