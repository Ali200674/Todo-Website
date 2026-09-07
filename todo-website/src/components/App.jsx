import Header from "./Header";

import TaskList from "./TaskList";

import TaskToolBar from "./TaskToolBar";

import { useState } from "react";

import TaskPagination from "./TaskPagination";

/**
 * A component that brings everything together
 *
 * @returns {JSX.Element}
 */
function App() {
  // Two use states. One to hold the tasks as an array of objects.
  // The other one for a search filter on the search field in the tool bar
  const [tasks, addNewTask] = useState([
    {
      taskId: crypto.randomUUID(),
      taskName: "A",
      description: "A",
      priority: "low",
    },
    {
      taskId: crypto.randomUUID(),
      taskName: "B",
      description: "A",
      priority: "low",
    },
    {
      taskId: crypto.randomUUID(),
      taskName: "C",
      description: "A",
      priority: "low",
    },
    {
      taskId: crypto.randomUUID(),
      taskName: "D",
      description: "A",
      priority: "low",
    },
    {
      taskId: crypto.randomUUID(),
      taskName: "E",
      description: "A",
      priority: "low",
    },
  ]);
  const [searchFilter, setSearchFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      {/* For the header */}
      <Header />

      <TaskToolBar addTask={addNewTask} setSearchFilter={setSearchFilter} />

      <TaskList
        tasks={tasks}
        searchFilter={searchFilter}
        filterCurrentTask={addNewTask}
        currentPage={currentPage}
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
