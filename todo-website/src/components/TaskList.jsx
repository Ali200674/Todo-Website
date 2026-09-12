import TaskItem from "./TaskItem";

/**
 * A component that represents the container of which tasks will be placed in.
 *
 * It will set below the TaskToolBar component.
 *
 * @param {Array} tasks An array of objects that each object will contain information about a task
 * @param {string} searchFilter A string that is used to filter out tasks from the search bar.
 * @param {Function} setTasksModify A function that is used to modify the tasks stored in a array of objects
 * @param {number} currentPage A number to tell which page the user is in
 * @param {object} filters An object that has filters for which tasks to show.
 * @returns {React.ReactElement}
 */
function TaskList({
  tasks,
  searchFilter,
  setTasksModify,
  currentPage,
  filters,
}) {
  const tasksShowedOnEachPage = 5;

  // Function to remove a specific task using it's id
  function removeSpecificTask(taskId) {
    setTasksModify(tasks.filter((task) => task.id !== taskId));
  }

  // Function to only show a specifc amount of tasks on a page
  function getAllTasksOnPage() {
    return tasks.slice(
      currentPage * tasksShowedOnEachPage - tasksShowedOnEachPage,
      tasksShowedOnEachPage * currentPage,
    );
  }

  /**
   * Function to update a task if the user clicks on the checkbox to the right of a task (indicating it's complete)
   *
   * @param {number} taskId An id to find a specific task
   * @param {boolean} completionStatus A boolean indicating if a task is complete or not
   */
  function updateTaskCompleted(taskId, completionStatus) {
    /*
      Map through each task. If we find the specific task by the taskId parameter,
      keep everything the same in the task, but change the completion status
     */
    setTasksModify((previousTasks) =>
      previousTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              taskCompleted: completionStatus,
            }
          : task,
      ),
    );
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
          .filter((t) => t.taskName.includes(searchFilter)) // First, if the user used the search bar, filter through that
          .filter((task) =>
            filters.priorities.length === 0
              ? task
              : filters.priorities.includes(task.priorityType.toLowerCase()),
          )
          .filter((task) =>
            filters.status.length === 0
              ? task
              : filters.status.includes(task.taskCompleted),
          )
          .map((task, key) => (
            <TaskItem
              key={key}
              taskId={task.id}
              taskInfo={task}
              removeCurrentTask={removeSpecificTask}
              updateTaskCompleted={updateTaskCompleted}
            />
          )) // Third, create a TaskItem component and pass in the taskId, taskInfo, removing a task and updating that task
      )}
    </div>
  );
}

export default TaskList;
