import "../styles/searchbar.css";
import searchbar from "../assets/search-bar-logo.svg";

function SearchBar() {
  return (
    <>
      <div className="search-bar-div">
        <div className="search-bar">
          <input type="text" placeholder="Search for task..." />
        </div>
        <button className="filters-task">Filters</button>
        <button className="create-task">Create Task</button>
      </div>
    </>
  );
}

export default SearchBar;
