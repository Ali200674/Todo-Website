import "../styles/TaskItem.css";
import downarrow from "../assets/down-arrow.svg";
import { useState } from "react";
import trashcan from "../assets/trash_can.svg";

/**
 * Test
 *
 * A component that represents a single task.
 *
 * @param {object} taskObj A object that contains information about the user's task
 * @returns {JSX.element} A component that represents a task
 */
function TaskItem({ taskInfo, removeCurrentTask, taskId }) {
  const [isClicked, setIsClicked] = useState(false);
  const [taskCompleted, setTaskCompleted] = useState(false);

  return (
    <div className={isClicked ? "task-item-div clicked" : "task-item-div"}>
      {/* The main information. It only contains the checkmark, task name and a img of a arrow */}
      <div className="top-section">
        <div className="left-side-task">
          {/* If the user clicks on the checkbox in this div, the task name is checked off */}
          <div className="task-check-off">
            <input
              type="checkbox"
              onClick={() => setTaskCompleted(!taskCompleted)}
            />
          </div>

          {/* If the taskComplete variable is true, cross the h2 off, else don't*/}
          <div className="task-item-heading">
            <h2 className={taskCompleted ? "cross-out-text" : ""}>
              {taskInfo.taskName}
            </h2>
          </div>
        </div>

        {/* Div that contains the img, if clicked, it shows other information that will be added later. */}
        <div className="right-side">
          <img
            src={downarrow}
            alt="A down arrow image"
            onClick={() => setIsClicked(!isClicked)}
            className={isClicked ? "img-clicked" : ""}
          />
        </div>
      </div>

      {/* Div that hold the extra information when the img is clicked. */}
      <div className="extra-information">
        <div className="task-description-div">
          <div className="task-description-title">
            <h3>Description</h3>
          </div>
          <div className="task-description">
            <p>{taskInfo.description}</p>
          </div>
        </div>

        <div className="buttons-div">
          <div className="delete-task-div">
            <img
              src={trashcan}
              alt=""
              onClick={() => removeCurrentTask(taskId)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
