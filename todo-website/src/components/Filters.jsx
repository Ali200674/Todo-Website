import { createPortal } from "react-dom";
import { useState } from "react";
import "../styles/filters.css";

function Filters({ modalVar, setModal }) {
  if (!modalVar) {
    return null;
  }

  return createPortal(
    <div className="model-background">
      <div className="filter-options-div">
        <div className="title">
          <h3>Filter Options</h3>
        </div>
        <div className="exit-model-button">
          <button onClick={() => setModal((p) => !p)}>X</button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Filters;
