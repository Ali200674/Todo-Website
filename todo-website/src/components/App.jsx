import Header from "./Header";

import TaskList from "./TaskList";

import TaskToolBar from "./TaskToolBar";

import { useState } from "react";

/**
 * A component that brings everything together
 *
 * @returns {JSX.Element}
 */
function App() {
  // Two use states. One to hold the tasks as an array of objects.
  // The other one for a search filter on the search field in the tool bar
  const [tasks, addNewTask] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <>
      {/* For the header */}
      <Header />

      <TaskToolBar addTask={addNewTask} setSearchFilter={setSearchFilter} />

      <TaskList
        tasks={tasks}
        searchFilter={searchFilter}
        filterCurrentTask={addNewTask}
      />
    </>
  );
}

export default App;
