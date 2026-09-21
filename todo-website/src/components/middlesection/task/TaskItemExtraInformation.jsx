import { DatePicker } from "rsuite";

/**
 * A component that represents extra information about a task
 *
 * @param {object} taskObj A object that contains information about the user's task
 * @param {boolean} isEditing A boolean that contains if the user if editing the task or not
 * @param {Function} modifyExistingTask A function that modifies the existing task
 * @returns {React.ReactElement}
 */

function TaskItemExtraInformation({ taskInfo, isEditing, modifyExistingTask }) {
  const selectedRadioButton = taskInfo.priorityType;
  const correctDueDate = new Date(taskInfo.taskDueDate);
  correctDueDate.setDate(correctDueDate.getDate() + 1);

  return (
    <>
      {/* Div that hold the extra information when the img is clicked. */}
      <div className="extra-info-div">
        <div className="extra-info-title">
          <h3>Extra Information About Task</h3>
        </div>
        <div className="extra-information">
          <div className="task-description-div">
            <div className="task-description-title">
              <h3>Description</h3>
            </div>
            <div className="task-description">
              <textarea
                className={isEditing ? "not-editable" : "is-editable"}
                disabled={isEditing}
                defaultValue={taskInfo.taskDescription}
                name="taskDescription"
                onChange={modifyExistingTask}
              ></textarea>
            </div>
          </div>
          <div className="right-side-information">
            <div className="priority-div">
              <div className="priority-heading">
                <h3>Prioritys</h3>
              </div>
              <div className="priority-selected-div">
                <div className="low-priority checkbox-div">
                  <input
                    className={isEditing ? "not-editable" : "is-editable"}
                    type="radio"
                    name={taskInfo.id}
                    value="low"
                    disabled={isEditing}
                    defaultChecked={selectedRadioButton === "LOW"}
                    onChange={modifyExistingTask}
                  />
                  <span>Low</span>
                </div>

                <div className="middle-priority checkbox-div">
                  <input
                    className={isEditing ? "not-editable" : "is-editable"}
                    type="radio"
                    name={taskInfo.id}
                    value="medium"
                    disabled={isEditing}
                    defaultChecked={selectedRadioButton === "MEDIUM"}
                    onChange={modifyExistingTask}
                  />
                  <span>Medium</span>
                </div>

                <div className="high-priority checkbox-div">
                  <input
                    className={isEditing ? "not-editable" : "is-editable"}
                    type="radio"
                    name={taskInfo.id}
                    value="high"
                    disabled={isEditing}
                    defaultChecked={selectedRadioButton === "HIGH"}
                    onChange={modifyExistingTask}
                  />
                  <span>High</span>
                </div>
              </div>
            </div>
            <div className="due-date">
              <div className="due-date-heading">
                <h3>Due-Date</h3>
              </div>
              <div
                className={
                  isEditing
                    ? "date-picker not-editable"
                    : "date-picker is-editable"
                }
              >
                {!isEditing || taskInfo.taskDueDate === null ? (
                  <div className="invalid-date">
                    <p>No Due Date</p>
                  </div>
                ) : (
                  <div>
                    <DatePicker
                      format="MM/dd/yyyy"
                      disabled={isEditing}
                      defaultValue={correctDueDate}
                      onChange={modifyExistingTask}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskItemExtraInformation;
