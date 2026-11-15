import "../styles/modal.css";

export default function ConfirmModal({
  open,
  title,
  message,
  buttonText = "OK",
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-icon">✓</div>
        <h3>{title}</h3>
        <p>{message}</p>
        <button type="button" className="modal-btn" onClick={onClose}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}
