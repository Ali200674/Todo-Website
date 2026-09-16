import { createPortal } from "react-dom";
import close from "../assets/close.svg";
import { useRef, useState } from "react";
import { DatePicker } from "rsuite";
import ErrorMessage from "./ErrorMessage";
import { useEffect } from "react";

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
  const [inputTaskTitleValue, setInputTaskTitleValue] = useState("");
  const descriptionValue = useRef(null);
  const [dateSelected, setSelectedDate] = useState("");
  const [radioButtonValue, setRadioButtonValue] = useState("");
  const [isErrorOccured, setIsErrorOccured] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  console.log(inputTaskTitleValue);

  useEffect(() => {
    if (!isErrorOccured) return;

    let popUp;

    popUp = setTimeout(() => {
      setIsErrorOccured((value) => !value);
    }, 5000);

    return () => clearInterval(popUp);
  }, [isErrorOccured]);

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
    event.preventDefault();

    if (isErrorOccured) {
      return;
    }

    let returnedData;

    // Create the task
    const task = {
      taskName: inputTaskTitleValue,
      taskDescription: descriptionValue.current.value,
      priorityType:
        radioButtonValue === "" ? null : radioButtonValue.toUpperCase(),
      taskCompleted: false,
      taskDueDate: dateSelected,
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
      const errorMessage = await response.json();

      setErrorMessage(errorMessage.errorMessage);
      setIsErrorOccured(!isErrorOccured);
      return;
    }

    returnedData = await response.json();

    // Add the task and close out the modal.
    addTask((tasks) => [...tasks, returnedData]);
    setModal((isActive) => !isActive);
    setInputTaskTitleValue("");

    console.log(returnedData);
  }

  // Changes the radio button value
  function handleRadioButtonChange(event) {
    setRadioButtonValue(event.target.value);
  }

  return createPortal(
    <div className="modal-background">
      <div className="create-task-div">
        <ErrorMessage
          isErrorOccured={isErrorOccured}
          errorMessage={errorMessage}
          setIsErrorOccured={setIsErrorOccured}
        />
        <div className="modal-title-div">
          <div className="title">
            <h2>Task Details</h2>
          </div>
          <div className="extra-info">
            <p>Enter in information about your task. (*) means it's optional</p>
          </div>
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
                onChange={(event) => {
                  setInputTaskTitleValue(event.target.value);
                }}
              />
            </div>
          </div>

          <div className="description-div">
            <div className="description-div-heading">
              <h3>Task Description (*)</h3>
            </div>
            <textarea
              name=""
              id=""
              ref={descriptionValue}
              placeholder="Enter in the description of the task"
            ></textarea>
          </div>
          {/* For priorities. Contains a Low, Medium and Height priority */}
          <div className="priority-main-div">
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
            <div className="due-date">
              <div className="due-date-heading">
                <h3>Due-Date (*)</h3>
              </div>
              <div className="date-picker">
                <DatePicker
                  format="MM/dd/yyyy"
                  onChange={(date) => {
                    if (date !== null)
                      setSelectedDate(date.toISOString().split("T")[0]);
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* A button that adds a task. */}
        <div className="submit-form-filters">
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
