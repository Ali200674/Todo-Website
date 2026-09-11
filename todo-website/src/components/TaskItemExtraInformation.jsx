/**
 * A component that represents extra information about a task
 *
 * @param {object} taskObj A object that contains information about the user's task
 * @param {number} taskId The id of a task
 * @returns {React.ReactElement}
 */

function TaskItemExtraInformation({ taskInfo, taskId }) {
  const selectedRadioButton = taskInfo.priorityType;

  return (
    <>
      {/* Div that hold the extra information when the img is clicked. */}
      <div className="extra-information">
        <div className="task-description-div">
          <div className="task-description-title">
            <h3>Description</h3>
          </div>
          <div className="task-description">
            <p>{taskInfo.taskDescription}</p>
          </div>
        </div>
        <div className="priority-div">
          <div className="priority-heading">
            <h3>Prioritys</h3>
          </div>
          <div className="priority-selected-div">
            <div className="low-priority checkbox-div">
              <input
                type="radio"
                name={taskId}
                value="low"
                disabled
                checked={selectedRadioButton === "LOW"}
              />
              <span>Low Priotity</span>
            </div>

            <div className="middle-priority checkbox-div">
              <input
                type="radio"
                name={taskId}
                value="medium"
                disabled
                checked={selectedRadioButton === "MEDIUM"}
              />
              <span>Medium Priority</span>
            </div>

            <div className="high-priority checkbox-div">
              <input
                type="radio"
                name={taskId}
                value="high"
                disabled
                checked={selectedRadioButton === "HIGH"}
              />
              <span>High Priority</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskItemExtraInformation;
