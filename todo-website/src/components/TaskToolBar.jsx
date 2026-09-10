import { useState } from "react";

import SearchBar from "./SearchBar";
import CreateTaskModal from "./CreateTaskModal.jsx";
import TaskFilterModal from "./TaskFilterModal.jsx";

import "../styles/SearchBar.css";

import searchbar from "../assets/search-bar-logo.svg";

/**
 * A component that represents the top tool bar that contains a search field and two buttons related to tasks.
 *
 * @param {Function} addTask A function that adds a new task to the array of objects from App.jsx
 * @param {Function} setSearchFilter A function that sets the search filter for the search bar from App.jsx
 * @returns {React.ReactNode} A component that represents the task tool bar of the website.
 */
function TaskToolBar({ addTask, setSearchFilter, setFilters }) {
  // Two useStates. One for the filters button and the other for the create task button
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showButtonModal, setShowButtonModal] = useState(false);

  const [priorityValue, setPriorityValues] = useState({
    priority: { low: false, medium: false, high: false },
    status: { active: false, completed: false },
  }); // useState for remembering what kind of priority value(s) the user has clicked

  return (
    <div className="search-bar-div">
      {/* Pass down the setSearchFilter to the SearchBar component */}
      <SearchBar setSearchFilter={setSearchFilter} />

      {/* Buttons near the input field */}
      {/* Button to open the FiltersModal component */}
      <button
        className="filters-task"
        onClick={() => setShowFilterModal((p) => !p)}
      >
        Filters
      </button>
      <TaskFilterModal
        setModal={setShowFilterModal}
        modalVar={showFilterModal}
        setFilters={setFilters}
        filterValues={priorityValue}
        setPriorityValues={setPriorityValues}
      />

      {/* Button to open the AddTaskModal component */}
      <button
        className="create-task"
        onClick={() => setShowButtonModal((p) => !p)}
      >
        + Create Task
      </button>
      <CreateTaskModal
        setModal={setShowButtonModal}
        modalVar={showButtonModal}
        addTask={addTask}
      />
    </div>
  );
}

export default TaskToolBar;
