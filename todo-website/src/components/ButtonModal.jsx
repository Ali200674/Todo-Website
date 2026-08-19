import { createPortal } from "react-dom";
import "../styles/Filters.css";
import close from "../assets/close.svg";

/**
 * This component is designed to be a modal for creating a task. Accepts two parameters.
 *
 * modalVar is a boolean and is for if the user clicks
 * the button to open the modal.
 *
 * setModal is to change the modalVar for when the user clicks the X on the top right of the modal
 *
 *
 * @param {*} param An object.
 * @returns {JSX.element}
 */
function ButtonModal({ modalVar, setModal }) {
  // If the modalVar is false, don't open the modal or just return null
  if (!modalVar) {
    return null;
  }

  return createPortal(
    <div className="modal-background">
      <div className="create-task-div">
        <div className="title">
          <h3>Task Details</h3>
        </div>

        <div className="exit-modal-button">
          <img src={close} onClick={() => setModal((p) => !p)} />
        </div>

        <div className="input-field">
          <input type="text" placeholder="Task Name..." />
        </div>

        <div className="submit-form">
          <form>
            <button>Add Task</button>
          </form>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ButtonModal;
