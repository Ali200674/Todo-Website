import "../styles/TaskItem.css";
import downarrow from "../assets/down-arrow.svg";
import { useState } from "react";

function TaskItem({ taskName }) {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className="task-item-div">
      <div className="left-side-task">
        <div className="task-item-heading">
          <h2>{taskName.taskName}</h2>
        </div>
        <div className="task-check-off">
          <input type="checkbox" />
        </div>
      </div>
      <div className="right-side">
        <img
          src={downarrow}
          alt="A down arrow image"
          onClick={() => setIsClicked(!isClicked)}
          className={isClicked ? "img-clicked" : ""}
        />
      </div>
    </div>
  );
}

export default TaskItem;
