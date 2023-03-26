import React from "react";
import "./spinner.css";

export const Spinner = () => {
  return (
    <div className="relative">
      <div className="flex top-3/4 lds-ripple" id="ripple">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
