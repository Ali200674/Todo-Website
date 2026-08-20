import "../styles/TaskList.css";
import TaskItem from "./TaskItem";

function TaskList() {
  return (
    <div className="task-list-container">
      {/* <div className="empty-container">
        <p>No Tasks!</p>
      </div> */}

      <TaskItem />
    </div>
  );
}

export default TaskList;
