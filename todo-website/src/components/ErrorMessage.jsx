/**
 * A component that represents an error message
 *
 * @param {boolean} isErrorOccured A boolean that contains if an error has occured
 * @param {string} errorMessage A message of the error.
 * @returns {React.ReactElement}
 */

function ErrorMessage({ isErrorOccured, errorMessage }) {
  return (
    <div
      className={
        !isErrorOccured
          ? "error-message-div"
          : "error-message-div error-occured"
      }
    >
      <div className="error-message">
        <span>{errorMessage}</span>
      </div>
    </div>
  );
}

export default ErrorMessage;
