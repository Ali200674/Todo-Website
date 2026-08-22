import { createPortal } from "react-dom";
import "../styles/Filters.css";
import close from "../assets/close.svg";

/**
 * This component is designed to be a modal for filtering for a task. Accepts two parameters.
 *
 * modalVar is a boolean and is for if the user clicks
 * the button to open the modal.
 *
 * setModal is to change the modalVar for when the user clicks the X on the top right of the modal
 *
 *
 * @param {boolean} modalVar A boolean that is used to see if the user has clicked a button to show the modal.
 * @param {Function} setModal A function to change the modalVar variable.
 * @returns {JSX.element} A component that represents a modal for filtering for a task
 */
function FilterModal({ modalVar, setModal }) {
  // If the modalVar is false, don't open the modal or just return null
  if (!modalVar) {
    return null;
  }

  // Using a createPortal to show this outside of the root div
  return createPortal(
    <div className="modal-background">
      {/* Title of the modal */}
      <div className="filter-options-div">
        <div className="title">
          <h2>Filter Options</h2>
        </div>

        {/* A img to exit out of the modal using the setModal variable */}
        <div className="exit-modal-button">
          <img src={close} onClick={() => setModal((p) => !p)} />
        </div>

        {/* Div that contains all of the modal options */}
        <div className="modal-options">
          {/* A priority div that contains a Low, Medium and Height priority  */}
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

          {/* A status div that contains a Active or Completed div */}
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
