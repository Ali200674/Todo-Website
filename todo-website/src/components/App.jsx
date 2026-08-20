import Header from "./Header";

import TaskList from "./TaskList";

import TaskToolBar from "./TaskToolBar";

import { useState } from "react";

function App() {
  const [tasks, addNewTask] = useState([]);

  return (
    <>
      <Header />

      <TaskToolBar addTask={addNewTask} />

      <TaskList tasks={tasks} />
    </>
  );
}

export default App;
