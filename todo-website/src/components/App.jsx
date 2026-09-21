import Header from "./Header";

import TaskList from "./TaskList";

import TaskToolBar from "./TaskToolBar";

import TaskPagination from "./TaskPagination";

import "../styles/main.css";

import "rsuite/dist/rsuite-no-reset.min.css";

import { useState, useEffect } from "react";

/**
 * A component that brings everything together
 *
 * @returns {React.ReactElement}
 */
function App() {
  const [tasks, setTasksModify] = useState([]); // useState for adding and modifying the array of tasks
  const [searchFilter, setSearchFilter] = useState(""); // useState for setting the search filter
  const [currentPage, setCurrentPage] = useState(1); // useState for setting the current page
  const [sizeOfTotalTasks, setSizeOfTotalTasks] = useState(0); // useState for keeping track of the total amount of pages on backend
  const [sizeOfEachPage, setSizeOfEachPage] = useState(0); // useState for keeping track of how much tasks are allowed on a page

  // useEffect for getting initial page of tasks in the database when the page first loads
  useEffect(() => {
    async function getAllTasks() {
      // GET request to get initial page of tasks
      const response = await fetch("http://localhost:8080/api/tasks");

      // Turn the json into a useable object
      const data = await response.json();

      // Set the total elements, size of tasks allowed and fill up the first page with tasks (four tasks)
      setSizeOfTotalTasks(data.totalElements);
      setSizeOfEachPage(data.size);
      setTasksModify(data.content);
    }

    getAllTasks();
  }, []);

  return (
    <>
      {/* For the header */}
      <Header />

      <TaskToolBar
        setTasksModify={setTasksModify}
        setSearchFilter={setSearchFilter}
        setCurrentPage={setCurrentPage}
        setSizeOfTotalTasks={setSizeOfTotalTasks}
        setSizeOfEachPage={setSizeOfEachPage}
      />

      <TaskList
        tasks={tasks}
        setTasksModify={setTasksModify}
        currentPage={currentPage}
        setSizeOfTotalTasks={setSizeOfTotalTasks}
        setCurrentPage={setCurrentPage}
      />

      <TaskPagination
        taskObj={tasks}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        setTasksModify={setTasksModify}
        sizeOfTotalTasks={sizeOfTotalTasks}
        sizeOfEachPage={sizeOfEachPage}
        searchFilter={searchFilter}
      />
    </>
  );
}

export default App;
