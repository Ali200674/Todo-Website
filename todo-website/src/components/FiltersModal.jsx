import { createPortal } from "react-dom";
import "../styles/filters.css";
import close from "../assets/close.svg";

function FilterModal({ modalVar, setModal }) {
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
        <div className="modal-options">
          <div className="priority-div">
            <div className="priority-heading">
              <h3>Prioritys</h3>
            </div>
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
          <div className="status-div">
            <div className="status-heading">
              <h3>Status</h3>
            </div>
            <div className="active-status checkbox-div">
              <input type="checkbox" name="status" value="active" />
              <span>Active</span>
            </div>
            <div className="completed-status checkbox-div">
              <input type="checkbox" name="status" value="completed" />
              <span>Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default FilterModal;
