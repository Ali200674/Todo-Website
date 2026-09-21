import TaskItem from "./TaskItem";

/**
 * A component that represents the container of which tasks will be placed in.
 *
 * It will set below the TaskToolBar component.
 *
 * @param {Array} tasks An array of objects that each object will contain information about a task
 * @param {Function} setTasksModify A function that is used to modify the tasks stored in a array of objects
 * @param {Function} setSizeOfTotalTasks A function that sets the size of the total tasks overall
 * @param {number} currentPage A number to tell which page the user is in
 * @param {Function} setCurrentPage A function that sets the page
 * @returns {React.ReactElement}
 */
function TaskList({
  tasks,
  setTasksModify,
  setSizeOfTotalTasks,
  setCurrentPage,
  currentPage,
}) {
  // Function to update a task if the user clicks on the checkbox to the right of a task (indicating it's complete)
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
              taskStatus: completionStatus,
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
        // Else, display each task
        tasks.map((task) => (
          <TaskItem
            key={task.id}
            taskInfo={task}
            tasksInCurrentPage={tasks}
            updateTaskCompleted={updateTaskCompleted}
            setSizeOfTotalTasks={setSizeOfTotalTasks}
            setCurrentPage={setCurrentPage}
            setTasksModify={setTasksModify}
            currentPage={currentPage}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
