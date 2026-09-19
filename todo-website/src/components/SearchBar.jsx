import { useRef } from "react";

import searchlogo from "../assets/search-bar-logo.svg";

/**
 * This component is designed to be a search bar or filter for the user's tasks.
 *
 * @param {Function} setSearchFilter A function that sets the search filter.
 * @returns {React.ReactElement} A component to represent a search bar.
 */
function SearchBar({ setSearchFilter, addTask }) {
  const userInput = useRef(null);

  function setTaskFilter() {
    setSearchFilter(userInput.current.value);
  }

  async function getAllTasksBasedOnSearch(event) {
    event.preventDefault();

    const searchParam = new URLSearchParams({
      search: userInput.current.value,
    });

    // A GET request to get all tasks from database
    const response = await fetch(
      `http://localhost:8080/api/tasks?${searchParam}`,
    );

    const data = await response.json();

    addTask(data);
  }

  return (
    <div className="search-bar">
      <img
        src={searchlogo}
        alt="A magnifying glass"
        onClick={getAllTasksBasedOnSearch}
      />
      <form action="" onSubmit={getAllTasksBasedOnSearch}>
        <input
          type="text"
          placeholder="Search for task..."
          ref={userInput}
          onChange={setTaskFilter}
        />
      </form>
    </div>
  );
}

export default SearchBar;
