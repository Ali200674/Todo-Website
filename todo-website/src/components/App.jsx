import Header from "./Header";

import TaskList from "./TaskList";

import TaskToolBar from "./TaskToolBar";

import { useState, useEffect } from "react";

import TaskPagination from "./TaskPagination";

import "../styles/main.css";

import "rsuite/dist/rsuite-no-reset.min.css";

/**
 * A component that brings everything together
 *
 * @returns {React.ReactElement}
 */
function App() {
  const [tasks, setTasksModify] = useState([]); // useState for adding and modifying the array
  const [searchFilter, setSearchFilter] = useState(""); // useState for setting the search filter
  const [currentPage, setCurrentPage] = useState(1); // useState for setting the current page
  const [fiters, setFilters] = useState({
    priorities: [],
    status: [],
  }); // useState that contains filters from the filtersModal.

  useEffect(() => {
    async function getAllTasks() {
      // A GET request to get all tasks from database
      const response = await fetch("http://localhost:8080/api/tasks");

      // Turn the json into a useable object
      const data = await response.json();

      // Add all of the tasks.
      setTasksModify(data);
    }

    getAllTasks();
  }, []); // useEffect for getting all of the tasks from the backend once this component is initialized once.

  return (
    <>
      {/* For the header */}
      <Header />

      <TaskToolBar
        addTask={setTasksModify}
        setSearchFilter={setSearchFilter}
        setFilters={setFilters}
      />

      <TaskList
        tasks={tasks}
        searchFilter={searchFilter}
        setTasksModify={setTasksModify}
        currentPage={currentPage}
        filters={fiters}
      />

      <TaskPagination
        taskObj={tasks}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
}

export default App;
