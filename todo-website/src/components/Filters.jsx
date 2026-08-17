import { createPortal } from "react-dom";
import { useState } from "react";
import "../styles/filters.css";
import close from "../assets/close.svg";

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
          <img src={close} onClick={() => setModal((p) => !p)} />
        </div>
        <div className="priority-div">
          <div className="low-priority checkbox-div">
            <input type="checkbox" name="priority" value="low" />
            <span>Low Priotity</span>
          </div>
          <div className="middle-priority checkbox-div">
            <input type="checkbox" name="priority" value="medium" />
            <span>Medium Priority</span>
          </div>
          <div className="high-priority checkbox-div">
            <input type="checkbox" name="priority" value="high" />
            <span>High Priority</span>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default Filters;
