import { createPortal } from "react-dom";
import "../styles/buttonmodal.css";
import close from "../assets/close.svg";

function ButtonModal({ modalVar, setModal }) {
  if (!modalVar) {
    return null;
  }

  return createPortal(
    <div className="modal-background">
      <div className="create-task-div">
        <div className="title">
          <h3>Create Task</h3>
        </div>
        <div className="exit-model-button">
          <img src={close} onClick={() => setModal((p) => !p)} />
        </div>
        <div className="input-field">
          <input type="text" placeholder="Task Name..." />
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default ButtonModal;
