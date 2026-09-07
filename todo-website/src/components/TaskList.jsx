import "../styles/TaskList.css";
import TaskItem from "./TaskItem";
import { use, useEffect } from "react";

/**
 * A component that represents the container of which tasks will be placed in.
 *
 * It will set below the TaskToolBar component.
 *
 * @param {Array} tasks An array of objects that each object will contain information about a task
 * @param {string} searchFilter A string that is used to filter out tasks from the search bar.
 * @returns
 */
function TaskList({ tasks, searchFilter, filterCurrentTask, currentPage }) {
  function removeSpecificTask(taskId) {
    filterCurrentTask(tasks.filter((task) => task.taskId !== taskId));
  }

  function getAllTasksOnPage() {
    return tasks.slice(currentPage * 5 - 5, 5 * currentPage);
  }

  return (
    <div className="task-list-container">
      {/* If there is no tasks, display a div that says No Tasks! */}
      {tasks.length === 0 ? (
        <div className="empty-container">
          <p>No Tasks!</p>
        </div>
      ) : (
        // Else, display whatever tasks there is and filter through them if the user typed in something in the search bar.
        getAllTasksOnPage()
          .filter((t) => t.taskName.includes(searchFilter))
          .map((task, key) => (
            <TaskItem
              key={key}
              taskId={task.taskId}
              taskInfo={task}
              removeCurrentTask={removeSpecificTask}
            />
          ))
      )}
    </div>
  );
}

export default TaskList;
