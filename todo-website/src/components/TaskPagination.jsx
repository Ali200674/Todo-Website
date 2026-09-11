import "../styles/TaskPagination.css";

/**
 *
 * @param {object} taskObj The object that holds all of the tasks.
 * @param {Function} setCurrentPage, A function that sets the current page the user is on
 * @param {number} currentPage, A number indicating which page the user is on
 * @returns {React.ReactElement}
 */
function TaskPagination({ taskObj, setCurrentPage, currentPage }) {
  // How much tasks are allowed on a page. (Does not actually represent how much tasks show on a page, that is on a different component)
  const amountPerPageTask = 5;
  const getAmountPages = Math.ceil(getAmountOfPages());
  const pages = []; // Array that will hold divs representing the pages
  const numberOfVisiblePageination = 4;

  getPageAmount();

  // Returns how much pages have the max amount of tasks
  function getAmountOfPages() {
    return taskObj.length / amountPerPageTask;
  }

  function getPageAmount() {
    // If there is only one page that contains tasks. don't add any numbers at the bottom
    if (getAmountPages === 1) {
      return;
    }

    // If there is more than four pages worth of tasks and the current page is 4 or above
    if (currentPage >= 4 && getAmountPages >= 4) {
      // Push a div that shows the first page
      pages.push(
        <div
          className={currentPage === 1 ? "page-number clicked" : "page-number"}
          onClick={() => {
            setCurrentPage(1);
          }}
        >
          1
        </div>,

        // Print these out to indicate that there is more pages
        <div className={"page-number"}>...</div>,
      );

      // Add the last two numbers of the current page (including the current page). so 3 4 (<- last two pages) 5(<- current page)
      for (let i = currentPage - 1; i < currentPage; i++) {
        pages.push(
          <div
            className={
              currentPage === i ? "page-number clicked" : "page-number"
            }
            onClick={() => {
              setCurrentPage(i);
            }}
          >
            {i}
          </div>,
        );
      }

      // Add the two pages ahead of the current one 5(<- current page) 6 7
      // Using a Math.min so we don't go over the amount of actual pages
      for (
        let i = currentPage;
        i < Math.min(getAmountPages, currentPage + 2);
        i++
      ) {
        pages.push(
          <div
            className={
              currentPage === i ? "page-number clicked" : "page-number"
            }
            onClick={() => {
              setCurrentPage(i);
            }}
          >
            {i}
          </div>,
        );
      }

      // If the current page we are on is not equal to the actual pages with tasks, is not less than 1 and 2 of the actual page, add the ...
      if (
        currentPage + 1 !== getAmountPages &&
        currentPage !== getAmountPages &&
        currentPage + 2 !== getAmountPages
      ) {
        pages.push(<div className="page-ellipsis">...</div>);
      }

      // If there is more than 4 pages of tasks, include them in the array.
      // 1 2 3 4 (6) <- if there is more than 4 pages, include that last page
      if (getAmountPages > numberOfVisiblePageination) {
        pages.push(
          <div
            className={
              currentPage === getAmountPages
                ? "page-number clicked"
                : "page-number"
            }
            onClick={() => setCurrentPage(getAmountPages)}
          >
            {getAmountPages}
          </div>,
        );
      }
    } else /* Else, there is less than four pages of tasks*/ {
      // Add the numbered amount of pages that we have. Choosing either the amount of pages we have currently, or the amount of visible pages we can have
      for (
        let i = 1;
        i <= Math.min(numberOfVisiblePageination, getAmountPages);
        i++
      ) {
        pages.push(
          <div
            className={
              currentPage === i ? "page-number clicked" : "page-number"
            }
            onClick={() => {
              setCurrentPage(i);
            }}
          >
            {i}
          </div>,
        );
      }

      // If there is more than 4 pages of tasks, include them in the array.
      if (getAmountPages > numberOfVisiblePageination) {
        pages.push(
          <div className="page-ellipsis">...</div>,
          <div
            className={
              currentPage === getAmountPages
                ? "page-number clicked"
                : "page-number"
            }
            onClick={() => {
              setCurrentPage(getAmountPages);
            }}
          >
            {getAmountPages}
          </div>,
        );
      }
    }
  }

  return <div className="pagination-div">{pages}</div>;
}

export default TaskPagination;
