import "../styles/TaskList.css";
import TaskItem from "./TaskItem";
import { use, useEffect } from "react";

function TaskList({ tasks }) {
  return (
    <div className="task-list-container">
      {/* <div className="empty-container">
        <p>No Tasks!</p>
      </div> */}

      {tasks.map((task, key) => (
        <TaskItem key={key} taskName={task} />
      ))}
    </div>
  );
}

export default TaskList;
