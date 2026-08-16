import "../styles/searchbar.css";
import searchbar from "../assets/search-bar-logo.svg";
import Filters from "./Filters";

function SearchBar() {
  return (
    <>
      <div className="search-bar-div">
        {/* A div for the input field as the search bar */}
        <div className="search-bar">
          <input type="text" placeholder="Search for task..." />
        </div>
        {/* Buttons near the input field */}
        <button className="filters-task">Filters</button>
        {/* <Filters /> */}
        <button className="create-task">+ Create Task</button>
      </div>
    </>
  );
}

export default SearchBar;
