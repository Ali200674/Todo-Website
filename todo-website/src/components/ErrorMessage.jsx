function ErrorMessage({ isErrorOccured, errorMessage, setIsErrorOccured }) {
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
