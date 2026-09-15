import { useRef } from "react";

/**
 * This component is designed to be a search bar or filter for the user's tasks.
 *
 * @param {Function} setSearchFilter A function that sets the search filter.
 * @returns {React.ReactElement} A component to represent a search bar.
 */
function SearchBar({ setSearchFilter }) {
  const userInput = useRef(null);

  console.log(userInput.current.value);

  function setTaskFilter() {
    setSearchFilter(userInput.current.value);
  }

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for task..."
        ref={userInput}
        onChange={setTaskFilter}
      />
    </div>
  );
}

export default SearchBar;
