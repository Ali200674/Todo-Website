import "../styles/searchbar.css";
import searchbar from "../assets/search-bar-logo.svg";
import FilterModal from "./FiltersModal.jsx";
import { useState } from "react";
import ButtonModal from "./ButtonModal.jsx";

function SearchBar() {
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showButtonModal, setShowButtonModal] = useState(false);

  return (
    <>
      <div className="search-bar-div">
        {/* A div for the input field as the search bar */}
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
