import { createPortal } from "react-dom";
import Button from "react-bootstrap/Button";
import { Modal as BootstrapModal } from "react-bootstrap";

export default function Modal({
  title,
  content,
  show,
  onClose,
  onConfirm,
  confirmText = "Conferma",
}) {
  const modalPortal = document.getElementById("detail-page");

  if (!show) return null;
  return createPortal(
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <div className="blur"></div>
      <BootstrapModal.Dialog>
        <BootstrapModal.Header>
          <BootstrapModal.Title>{title}</BootstrapModal.Title>
        </BootstrapModal.Header>

        <BootstrapModal.Body>
          <p>{content}</p>
        </BootstrapModal.Body>

        <BootstrapModal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Annulla
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Conferma
          </Button>
        </BootstrapModal.Footer>
      </BootstrapModal.Dialog>
    </div>,
    modalPortal
  );
}
