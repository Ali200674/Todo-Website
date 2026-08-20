import "../styles/TaskItem.css";

function TaskItem() {
  return (
    <div className="task-item-div">
      <div className="left-side-task">
        <div className="task-item-heading">
          <h2>Take Out Garbage</h2>
        </div>
        <div className="task-check-off">
          <input type="checkbox" />
        </div>
      </div>
      <div className="right-side">
        <p>Test</p>
      </div>
    </div>
  );
}

export default TaskItem;
