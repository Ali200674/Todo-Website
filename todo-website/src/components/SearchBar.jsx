import "../styles/SearchBar.css";
import searchbar from "../assets/search-bar-logo.svg";
import FilterModal from "./FiltersModal.jsx";
import { useState } from "react";
import ButtonModal from "./ButtonModal.jsx";

/**
 * This component is designed to be a search bar or filter for the user's tasks.
 *
 * @returns
 */
function SearchBar() {
  // Two useStates. One for the filters button and the other for the create task button
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showButtonModal, setShowButtonModal] = useState(false);

  return (
    <>
      <div className="search-bar-div">
        <div className="search-bar">
          <input type="text" placeholder="Search for task..." />
        </div>
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
        <ButtonModal setModal={setShowButtonModal} modalVar={showButtonModal} />
      </div>
    </>
  );
}

export default SearchBar;
