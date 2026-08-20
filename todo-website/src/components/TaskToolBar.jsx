import { useState } from "react";

import SearchBar from "./SearchBar";
import ButtonModal from "./AddTaskModal.jsx";
import FilterModal from "./FiltersModal.jsx";

import "../styles/SearchBar.css";

import searchbar from "../assets/search-bar-logo.svg";

function TaskToolBar({ addTask }) {
  // Two useStates. One for the filters button and the other for the create task button
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showButtonModal, setShowButtonModal] = useState(false);

  return (
    <div className="search-bar-div">
      <SearchBar />

      {/* Buttons near the input field */}
      <button
        className="filters-task"
        onClick={() => setShowFilterModal((p) => !p)}
      >
        Filters
      </button>
      <FilterModal setModal={setShowFilterModal} modalVar={showFilterModal} />
      <button
        className="create-task"
        onClick={() => setShowButtonModal((p) => !p)}
      >
        + Create Task
      </button>
      <ButtonModal
        setModal={setShowButtonModal}
        modalVar={showButtonModal}
        addTask={addTask}
      />
    </div>
  );
}

export default TaskToolBar;
