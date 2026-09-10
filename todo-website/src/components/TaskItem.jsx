import "../styles/TaskItem.css";
import downarrow from "../assets/down-arrow.svg";
import { useState } from "react";
import trashcan from "../assets/trash_can.svg";
import { useId } from "react";

/**
 * Test
 *
 * A component that represents a single task.
 *
 * @param {object} taskObj A object that contains information about the user's task
 * @returns {JSX.element} A component that represents a task
 */
function TaskItem({
  taskInfo,
  removeCurrentTask,
  taskId,
  updateTaskCompleted,
}) {
  const [isClicked, setIsClicked] = useState(false);
  const selectedRadioButton = taskInfo.priorityType;

  async function removeTask() {
    const response = await fetch(`http://localhost:8080/api/task/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Issue adding task to backend.");
    }

    removeCurrentTask(taskId);
  }

  async function setTaskAsCompleted() {
    const competedStatus = !taskInfo.taskCompleted;

    const response = await fetch(`http://localhost:8080/api/task/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        taskCompleted: competedStatus,
      }),
    });

    if (!response.ok) {
      throw new Error("PATCH method went wrong.");
    }

    updateTaskCompleted(taskInfo.id, competedStatus);
  }

  return (
    <div className={isClicked ? "task-item-div clicked" : "task-item-div"}>
      {/* The main information. It only contains the checkmark, task name and a img of a arrow */}
      <div className="top-section">
        <div className="left-side-task">
          {/* If the user clicks on the checkbox in this div, the task name is checked off */}
          <div className="task-check-off">
            <input
              type="checkbox"
              onChange={setTaskAsCompleted}
              checked={taskInfo.taskCompleted}
            />
          </div>

          {/* If the taskComplete variable is true, cross the h2 off, else don't*/}
          <div className="task-item-heading">
            <h2 className={taskInfo.taskCompleted ? "cross-out-text" : ""}>
              {taskInfo.taskName}
            </h2>
          </div>
        </div>

        {/* Div that contains the img, if clicked, it shows other information that will be added later. */}
        <div className="right-side">
          <div className="images-div">
            <div className="delete-task-div">
              <img src={trashcan} alt="" onClick={removeTask} />
            </div>
            <div className="expand-task">
              <img
                src={downarrow}
                alt="A down arrow image"
                onClick={() => setIsClicked(!isClicked)}
                className={isClicked ? "img-clicked" : ""}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Div that hold the extra information when the img is clicked. */}
      <div className="extra-information">
        <div className="task-description-div">
          <div className="task-description-title">
            <h3>Description</h3>
          </div>
          <div className="task-description">
            <p>{taskInfo.taskDescription}</p>
          </div>
        </div>
        <div className="priority-div">
          <div className="priority-heading">
            <h3>Prioritys</h3>
          </div>
          <div className="priority-selected-div">
            <div className="low-priority checkbox-div">
              <input
                type="radio"
                name={taskId}
                value="low"
                disabled
                checked={selectedRadioButton === "LOW"}
              />
              <span>Low Priotity</span>
            </div>

            <div className="middle-priority checkbox-div">
              <input
                type="radio"
                name={taskId}
                value="medium"
                disabled
                checked={selectedRadioButton === "MEDIUM"}
              />
              <span>Medium Priority</span>
            </div>

            <div className="high-priority checkbox-div">
              <input
                type="radio"
                name={taskId}
                value="high"
                disabled
                checked={selectedRadioButton === "HIGH"}
              />
              <span>High Priority</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
