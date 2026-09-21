import SearchBar from "./SearchBar";
import CreateTaskModal from "./CreateTaskModal.jsx";
import TaskFilterModal from "./TaskFilterModal.jsx";

import { useState } from "react";
/**
 * A component that represents the top tool bar that contains a search field and two buttons related to tasks.
 *
 * @param {Function} setTasksModify A function that adds a new task to the array of objects from App.jsx
 * @param {Function} setSearchFilter A function that sets the search filter for the search bar from App.jsx
 * @param {Function} setCurrentPage A function that sets the page
 * @param {Function} setSizeOfTotalTasks A function that sets the size of the total tasks overall
 * @returns {React.ReactNode}
 */
function TaskToolBar({
  setTasksModify,
  setSearchFilter,
  setCurrentPage,
  setSizeOfTotalTasks,
  setSizeOfEachPage,
}) {
  // Two useStates. One for the filters modal and the other for the create task modal
  const [isTaskFilterModalVisible, setIsTaskFilterModalVisible] =
    useState(false);
  const [isCreateTaskModalVisible, setIsCreateTaskModalVisible] =
    useState(false);

  // useState for remembering what kind of priority value(s) the user has clicked
  const [taskModalFilters, setTaskModalFilters] = useState({
    priority: [],
    status: [],
    dueDate: null,
  });

  return (
    <div className="search-bar-div">
      <SearchBar
        setSearchFilter={setSearchFilter}
        setTasksModify={setTasksModify}
        setCurrentPage={setCurrentPage}
        setSizeOfEachPage={setSizeOfEachPage}
        setSizeOfTotalTasks={setSizeOfTotalTasks}
      />

      <button
        className="filters-task"
        onClick={() => setIsTaskFilterModalVisible((isActive) => !isActive)}
      >
        Filters
      </button>
      <TaskFilterModal
        setIsTaskFilterModalVisible={setIsTaskFilterModalVisible}
        isTaskFilterModalVisible={isTaskFilterModalVisible}
        filterValues={taskModalFilters}
        setTaskModalFilters={setTaskModalFilters}
        setCurrentPage={setCurrentPage}
        setTasksModify={setTasksModify}
      />

      <button
        className="create-task"
        onClick={() => setIsCreateTaskModalVisible((isActive) => !isActive)}
      >
        + Create Task
      </button>
      <CreateTaskModal
        setModal={setIsCreateTaskModalVisible}
        isCreateTaskModalVisible={isCreateTaskModalVisible}
        setTasksModify={setTasksModify}
        setSizeOfTotalTasks={setSizeOfTotalTasks}
      />
    </div>
  );
}

export default TaskToolBar;
