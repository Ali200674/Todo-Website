import { createPortal } from "react-dom";
import "../styles/Filters.css";
import close from "../assets/close.svg";
import { useRef } from "react";

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
function ButtonModal({ modalVar, setModal, addTask }) {
  const inputBarValue = useRef(null);

  // If the modalVar is false, don't open the modal or just return null
  if (!modalVar) {
    return null;
  }

  function createNewTask(event) {
    event.preventDefault();
    addTask((p) => [...p, { taskName: inputBarValue.current.value }]);
  }

  return createPortal(
    <div className="modal-background">
      <div className="create-task-div">
        <div className="title">
          <h2>Task Details</h2>
        </div>

        <div className="exit-modal-button">
          <img src={close} onClick={() => setModal((p) => !p)} />
        </div>

        <div className="modal-options">
          <div className="input-field-div">
            <div className="input-field-heading">
              <h3>Task Name</h3>
            </div>
            <div className="input-field">
              <input
                type="text"
                placeholder="Task Name..."
                ref={inputBarValue}
              />
            </div>
          </div>

          {/* <div className="priority-type-div">
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
          </div> */}
        </div>

        <div className="submit-form">
          <form>
            <button onClick={createNewTask}>Add Task</button>
          </form>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ButtonModal;
