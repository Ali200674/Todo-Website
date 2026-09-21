import { createPortal } from "react-dom";
import close from "../assets/close.svg";
import { DatePicker } from "rsuite";

/**
 * This component is designed to be a modal for filtering for a task. Accepts two parameters.
 *
 * @param {boolean} isTaskFilterModalVisible A boolean that is used to see if the user has clicked a button to show the modal.
 * @param {Function} setIsTaskFilterModalVisible A function to change the isTaskFilterModalVisible variable.
 * @param {Function} setFilters A function to change the filters the user wants to apply for filtering out tasks
 * @param {Function} setPriorityValues A function to change the
 * @returns {React.ReactElement}
 */
function TaskFilterModal({
  isTaskFilterModalVisible,
  setIsTaskFilterModalVisible,
  setTaskModalFilters,
  filterValues,
  setCurrentPage,
  setTasksModify,
}) {
  // If the isTaskFilterModalVisible is false, don't open the modal or just return null
  if (!isTaskFilterModalVisible) {
    return null;
  }

  // A method to remember what the user has choosen for filters on the page
  function rememberUserChoosenFilter(event) {
    const { value, name } = event.target;

    setTaskModalFilters((values) => ({
      ...values,
      [name]: values[name].includes(value)
        ? values[name].filter((variable) => variable !== value)
        : [...values[name], value],
    }));
  }

  async function getAllTasksBasedOnFilters(event) {
    event.preventDefault();

    const filteringObject = {
      taskPriorityList: filterValues.priority,
      taskStatuses: filterValues.status,
    };

    if (filterValues.dueDate !== null)
      filteringObject.taskDueDate = filterValues.dueDate
        .toISOString()
        .split("T")[0];

    const filters = new URLSearchParams(filteringObject);

    const response = await fetch(
      `http://localhost:8080/api/tasks/filters?${filters}`,
    );

    const data = await response.json();

    setCurrentPage(1);
    setTasksModify(data.content);
  }

  // Using a createPortal to show this outside of the root div
  return createPortal(
    <div className="modal-background">
      {/* Title of the modal */}
      <div className="filter-options-div">
        <div className="modal-title-div">
          <div className="title">
            <h2>Filter Options</h2>
          </div>
          <div className="extra-info">
            <p>Select the filters you would like to apply</p>
          </div>
        </div>

        {/* A img to exit out of the modal using the setIsTaskFilterModalVisible variable */}
        <div className="exit-modal-button">
          <img
            src={close}
            onClick={() => setIsTaskFilterModalVisible((p) => !p)}
          />
        </div>

        {/* Div that contains all of the modal options */}
        <div className="modal-options">
          {/* A priority div that contains a Low, Medium and Height priority  */}
          <div className="priority-div">
            <div className="priority-heading">
              <h3>Prioritys</h3>
            </div>

            <div className="low-priority checkbox-div">
              <input
                type="checkbox"
                name="priority"
                value="LOW"
                checked={filterValues.priority.includes("LOW")}
                onChange={rememberUserChoosenFilter}
              />
              <span>Low</span>
            </div>

            <div className="middle-priority checkbox-div">
              <input
                type="checkbox"
                name="priority"
                value="MEDIUM"
                checked={filterValues.priority.includes("MEDIUM")}
                onChange={rememberUserChoosenFilter}
              />
              <span>Medium</span>
            </div>

            <div className="high-priority checkbox-div">
              <input
                type="checkbox"
                name="priority"
                value="HIGH"
                checked={filterValues.priority.includes("HIGH")}
                onChange={rememberUserChoosenFilter}
              />
              <span>High</span>
            </div>
          </div>

          {/* A status div that contains a Active or Completed div */}
          <div className="status-div">
            <div className="status-heading">
              <h3>Status</h3>
            </div>

            <div className="active-status checkbox-div">
              <input
                type="checkbox"
                name="status"
                value="ACTIVE"
                checked={filterValues.status.includes("ACTIVE")}
                onChange={rememberUserChoosenFilter}
              />
              <span>Active</span>
            </div>

            <div className="completed-status checkbox-div">
              <input
                type="checkbox"
                name="status"
                value="COMPLETED"
                checked={filterValues.status.includes("COMPLETED")}
                onChange={rememberUserChoosenFilter}
              />
              <span>Completed</span>
            </div>
          </div>
          <div className="due-date">
            <div className="due-date-heading">
              <h3>Due-Date</h3>
            </div>
            <div className="date-picker">
              <DatePicker
                format="MM/dd/yyyy"
                onChange={(date) => {
                  // setSelectedDate(date.toISOString().split("T")[0]);
                  setTaskModalFilters((values) => ({
                    ...values,
                    dueDate: date,
                  }));
                }}
                value={filterValues.dueDate}
              />
            </div>
          </div>
        </div>

        <div className="buttons">
          <div className="reset-filters">
            <button
              onClick={() => {
                setTaskModalFilters({
                  priority: { low: false, medium: false, high: false },
                  status: { active: false, completed: false },
                  dueDate: null,
                });
              }}
            >
              Reset Filters
            </button>
          </div>
          <div className="submit-form-filters">
            <form onSubmit={getAllTasksBasedOnFilters}>
              <button>Apply Filters</button>
            </form>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default TaskFilterModal;
