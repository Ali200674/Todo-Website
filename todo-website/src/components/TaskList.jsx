import "../styles/TaskList.css";
import TaskItem from "./TaskItem";
import { use, useEffect } from "react";

function TaskList({ tasks, searchFilter }) {
  return (
    <div className="task-list-container">
      {tasks.length === 0 ? (
        <div className="empty-container">
          <p>No Tasks!</p>
        </div>
      ) : (
        tasks
          .filter((t) => t.taskName.includes(searchFilter))
          .map((task, key) => <TaskItem key={key} taskName={task} />)
      )}
    </div>
  );
}

export default TaskList;
