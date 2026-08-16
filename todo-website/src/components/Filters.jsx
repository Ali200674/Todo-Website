import { createPortal } from "react-dom";
import "../styles/filters.css";

function Filters() {
  return createPortal(
    <div className="filter-options-div">
      <div className="title">
        <h3>Filter Options</h3>
      </div>
    </div>,
    document.body,
  );
}

export default Filters;
