import Header from "./Header";

import TaskList from "./TaskList";

import TaskToolBar from "./TaskToolBar";

import { useState } from "react";

function App() {
  const [tasks, addNewTask] = useState([]);
  const [searchFilter, setSearchFilter] = useState("");

  return (
    <>
      <Header />

      <TaskToolBar addTask={addNewTask} setSearchFilter={setSearchFilter} />

      <TaskList tasks={tasks} searchFilter={searchFilter} />
    </>
  );
}

export default App;
