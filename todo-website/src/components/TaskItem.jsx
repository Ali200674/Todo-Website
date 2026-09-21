import TaskItemExtraInformation from "./TaskItemExtraInformation";
import { useState } from "react";

import trashcan from "../assets/trash_can.svg";
import downarrow from "../assets/down-arrow.svg";
import editpencil from "../assets/edit-pencil.svg";
import checkmark from "../assets/checkmark.svg";

/**
 * A component that represents a single task.
 *
 * @param {object} taskInfo A object that contains information about the user's task
 * @param {Function} updateTaskCompleted A function that updates the status of a task
 * @param {Function} setSizeOfTotalTasks A function that sets the size of the total tasks overall
 * @param {Function} setCurrentPage A function that sets the page
 * @param {Array} tasksInCurrentPage An array of objects that each object will contain information about a task
 * @param {Function} setTasksModify A function that is used to modify the tasks stored in a array of objects
 * @param {number} currentPage A number to tell which page the user is in
 * @returns {React.ReactElement}
 */
function TaskItem({
  taskInfo,
  removeCurrentTask,
  updateTaskCompleted,
  setSizeOfTotalTasks,
  setCurrentPage,
  tasksInCurrentPage,
  setTasksModify,
  currentPage,
}) {
  // useState for if the user clicks on the arrow to look at the extra information
  const [isClicked, setIsClicked] = useState(false);

  // useState for if the user is editing the task
  const [isEditing, setIsEditing] = useState(false);

  // useState for modifiying the task
  const [modifiedTask, setModifiedTask] = useState({
    taskName: taskInfo.taskName,
    taskDescription: taskInfo.taskDescription,
    priorityType: taskInfo.priorityType,
    taskDueDate: taskInfo.taskDueDate,
  });

  // Method to modify existing task
  function modifyExistingTask(event) {
    // If user is modifying the date
    if (event instanceof Date) {
      setModifiedTask((prevTask) => ({
        ...prevTask,
        taskDueDate: event.toISOString().split("T")[0],
      }));
      return;
    }

    const { name, value } = event.target;

    // If we are modifying the check box (priorities)
    if (Number(name) === taskInfo.id) {
      setModifiedTask((prevData) => ({
        ...prevData,
        priorityType: value.toUpperCase(),
      }));
    } else {
      // Else, modify the other values
      setModifiedTask((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }

  // Method to refresh the page
  async function getContentFromPage(pageNum) {
    const response = await fetch(
      `http://localhost:8080/api/tasks?pageNum=${pageNum - 1}`,
    );

    if (!response.ok) {
      throw Error("Something went wrong");
    }

    const data = await response.json();

    setTasksModify(data.content);
  }

  // Method to remove task
  async function removeTask() {
    const response = await fetch(
      `http://localhost:8080/api/task/${taskInfo.id}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error("Issue removing task to backend.");
    }

    // Remove task from object and set size of total task
    setSizeOfTotalTasks((task) => task - 1);
    getContentFromPage(currentPage);

    if (tasksInCurrentPage.length - 1 === 0 && currentPage !== 1) {
      setCurrentPage((currentPage) => {
        getContentFromPage(currentPage - 1);

        return currentPage - 1 >= 0 ? currentPage - 1 : currentPage;
      });
    }
  }

  async function setTaskAsCompleted() {
    const competedStatus =
      taskInfo.taskStatus === "ACTIVE" ? "COMPLETED" : "ACTIVE";

    const response = await fetch(
      `http://localhost:8080/api/task/${taskInfo.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(competedStatus),
      },
    );

    if (!response.ok) {
      throw new Error("PATCH method went wrong.");
    }

    updateTaskCompleted(taskInfo.id, competedStatus);
  }

  async function updateWholeTask() {
    setIsEditing((value) => !value);

    const response = await fetch(
      `http://localhost:8080/api/task/${taskInfo.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(modifiedTask),
      },
    );

    if (!response.ok) {
      throw new Error("PATCH method went wrong.");
    }
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
              checked={taskInfo.taskStatus === "COMPLETED"}
            />
          </div>

          {/* If the taskComplete variable is true, cross the title off, else don't*/}
          <div className="task-item-heading">
            <input
              type="text"
              name="taskName"
              className={`${taskInfo.taskStatus === "COMPLETED" ? "cross-out-text" : ""} ${!isEditing ? "not-editable" : "is-editable"}`}
              defaultValue={taskInfo.taskName}
              disabled={!isEditing}
              onChange={modifyExistingTask}
            />
          </div>
        </div>

        {/* Div that contains the img, if clicked, it shows other information that will be added later. */}
        <div className="right-side">
          <div className="images-div">
            <div className="edit-pencil-div">
              <img
                src={isEditing ? checkmark : editpencil}
                alt="An image of a pencil"
                onClick={
                  !isEditing
                    ? () => setIsEditing((value) => !value)
                    : updateWholeTask
                }
              />
            </div>
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
      <TaskItemExtraInformation
        taskInfo={taskInfo}
        isEditing={!isEditing}
        modifyExistingTask={modifyExistingTask}
      />
    </div>
  );
}

export default TaskItem;
