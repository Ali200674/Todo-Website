import { createPortal } from "react-dom";
import "../styles/Filters.css";
import close from "../assets/close.svg";
import { useState } from "react";

/**
 * This component is designed to be a modal for filtering for a task. Accepts two parameters.
 *
 * modalVar is a boolean and is for if the user clicks
 * the button to open the modal.
 *
 * setModal is to change the modalVar for when the user clicks the X on the top right of the modal
 *
 *
 * @param {boolean} modalVar A boolean that is used to see if the user has clicked a button to show the modal.
 * @param {Function} setModal A function to change the modalVar variable.
 * @param {Function} setFilters A function to change the filters the user wants to apply for filtering out tasks
 * @param {Function} setPriorityValues A function to change the
 * @returns {JSX.element} A component that represents a modal for filtering for a task
 */
function FilterModal({
  modalVar,
  setModal,
  setFilters,
  setPriorityValues,
  filterValues,
}) {
  // If the modalVar is false, don't open the modal or just return null
  if (!modalVar) {
    return null;
  }

  //TODO: Figure out a way to keep the state of the checkbox after closure

  function addFilterPriority(event) {
    const { value, name, checked } = event.target;

    setPriorityValues((values) => ({
      ...values,
      [name]: {
        ...values[name],
        [value]: !values[name][value],
      },
    }));

    console.log();

    if (event.target.name === "priority") {
      setFilters((value) => ({
        ...value,
        priorities: value.priorities.includes(event.target.value)
          ? value.priorities.filter(
              (priority) => priority !== event.target.value,
            )
          : [...value.priorities, event.target.value],
      }));
    } else {
      const statusConversion = {
        active: false,
        completed: true,
      };

      setFilters((value) => ({
        ...value,
        status: value.status.includes(statusConversion[event.target.value])
          ? value.status.filter(
              (status) => status !== statusConversion[event.target.value],
            )
          : [...value.status, statusConversion[event.target.value]],
      }));
    }
  }

  // Using a createPortal to show this outside of the root div
  return createPortal(
    <div className="modal-background">
      {/* Title of the modal */}
      <div className="filter-options-div">
        <div className="title">
          <h2>Filter Options</h2>
        </div>

        {/* A img to exit out of the modal using the setModal variable */}
        <div className="exit-modal-button">
          <img src={close} onClick={() => setModal((p) => !p)} />
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
                value="low"
                checked={filterValues.priority.low}
                onChange={addFilterPriority}
              />
              <span>Low Priotity</span>
            </div>

            <div className="middle-priority checkbox-div">
              <input
                type="checkbox"
                name="priority"
                value="medium"
                checked={filterValues.priority.medium}
                onChange={addFilterPriority}
              />
              <span>Medium Priority</span>
            </div>

            <div className="high-priority checkbox-div">
              <input
                type="checkbox"
                name="priority"
                value="high"
                checked={filterValues.priority.high}
                onChange={addFilterPriority}
              />
              <span>High Priority</span>
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
                value="active"
                checked={filterValues.status.active}
                onChange={addFilterPriority}
              />
              <span>Active</span>
            </div>

            <div className="completed-status checkbox-div">
              <input
                type="checkbox"
                name="status"
                value="completed"
                checked={filterValues.status.completed}
                onChange={addFilterPriority}
              />
              <span>Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default FilterModal;
