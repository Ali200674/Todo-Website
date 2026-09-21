import searchlogo from "../assets/search-bar-logo.svg";

import { useRef } from "react";

/**
 * This component is designed to be a search bar or filter for the user's tasks.
 *
 * @param {Function} setSearchFilter A function that sets the search filter.
 * @param {Function} setTasksModify A function to add tasks
 * @param {Function} setCurrentPage
 * @param {Function} setSizeOfTotalTasks
 * @param {Function} set
 * @returns {React.ReactElement} A component to represent a search bar.
 */
function SearchBar({
  setSearchFilter,
  setTasksModify,
  setCurrentPage,
  setSizeOfTotalTasks,
  setSizeOfEachPage,
}) {
  // useRef for the users input
  const userInput = useRef(null);

  // Method to change the search filter of user
  function setTaskFilter() {
    setSearchFilter(userInput.current.value);
  }

  // Method to get all tasks based on search filter
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

    // Add all tasks and set the page back to one
    setTasksModify(data.content);
    setSizeOfTotalTasks(data.totalElements);
    setSizeOfEachPage(data.size);
    setCurrentPage(1);
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
