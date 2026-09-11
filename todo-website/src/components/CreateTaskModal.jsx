import { createPortal } from "react-dom";
import "../styles/Filters.css";
import close from "../assets/close.svg";
import { useRef, useState } from "react";

/**
 * This component is designed to be a modal for creating a task. Accepts two parameters.
 *
 * modalVar is a boolean and is for if the user clicks
 * the button to open the modal.
 *
 * setModal is to change the modalVar for when the user clicks the X on the top right of the modal
 *
 *
 * @param {boolean} modalVar A boolean that is used to see if the user has clicked a button to show the modal.
 * @param {Function} setModal A function to change the modalVar variable.
 * @param {Function} addTask A function that adds a new task to the array of objects from App.jsx
 * @returns {React.ReactElement}
 */
function ButtonModal({ modalVar, setModal, addTask }) {
  const inputBarValue = useRef(null);
  const descriptionValue = useRef(null);
  const [radioButtonValue, setRadioButtonValue] = useState("");

  // If the modalVar is false, don't open the modal or just return null
  if (!modalVar) {
    return null;
  }

  /*
    A function to create a new task when the user clicks on "Add Task"
    It uses the addTask function that is passed down from App.jsx.
    It also closes the modal.
  */
  async function createNewTask(event) {
    let returnedData;

    event.preventDefault();

    // Create the task
    const task = {
      taskName: inputBarValue.current.value,
      taskDescription: descriptionValue.current.value,
      priorityType: radioButtonValue.toUpperCase(),
      taskCompleted: false,
    };

    // Send a POST request to the backend
    const response = await fetch("http://localhost:8080/api/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (!response.ok) {
      throw new Error("Issue adding task to backend.");
    }

    returnedData = await response.json();

    // Add the task and close out the modal.
    addTask((tasks) => [...tasks, returnedData]);
    setModal((isActive) => !isActive);
  }

  // Changes the radio button value
  function handleRadioButtonChange(event) {
    setRadioButtonValue(event.target.value);
  }

  return createPortal(
    <div className="modal-background">
      <div className="create-task-div">
        <div className="title">
          <h2>Task Details</h2>
        </div>

        {/* Exit img that closes out the modal if clicked */}
        <div className="exit-modal-button">
          <img src={close} onClick={() => setModal((p) => !p)} />
        </div>

        {/* For all options to add a task */}
        <div className="modal-options">
          <div className="input-field-div">
            {/* A sub heading above the input field */}
            <div className="input-field-heading">
              <h3>Task Name</h3>
            </div>

            {/* For the input field */}
            <div className="input-field">
              <input
                type="text"
                placeholder="Task Name..."
                ref={inputBarValue}
              />
            </div>
          </div>
          {/* For priorities. Contains a Low, Medium and Height priority */}
          <div className="priority-type-div">
            <div className="priority-heading">
              <h3>Prioritys</h3>
            </div>
            <div className="priority-type">
              <div className="low-priority checkbox-div">
                <input
                  type="radio"
                  name="priority"
                  value="low"
                  checked={radioButtonValue === "low"}
                  onChange={handleRadioButtonChange}
                />
                <span>Low Priotity</span>
              </div>

              <div className="middle-priority checkbox-div">
                <input
                  type="radio"
                  name="priority"
                  value="medium"
                  checked={radioButtonValue === "medium"}
                  onChange={handleRadioButtonChange}
                />
                <span>Medium Priority</span>
              </div>

              <div className="high-priority checkbox-div">
                <input
                  type="radio"
                  name="priority"
                  value="high"
                  checked={radioButtonValue === "high"}
                  onChange={handleRadioButtonChange}
                />
                <span>High Priority</span>
              </div>
            </div>
          </div>
        </div>

        <div className="description-div">
          <div className="description-div-heading">
            <h3>Task Description (Optional)</h3>
          </div>
          <textarea name="" id="" ref={descriptionValue}></textarea>
        </div>

        {/* A button that adds a task. */}
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
