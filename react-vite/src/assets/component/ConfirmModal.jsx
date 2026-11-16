export default function ConfirmModal({
  open,
  title,
  message,
  buttonText = "OK",
  onClose,
}) {
  if (!open) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        background: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(380px, 100%)",
          padding: "24px",
          background: "#fff",
          borderRadius: "10px",
          textAlign: "center",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
        }}
      >
        <div
          style={{
            width: "48px",
            height: "48px",
            margin: "0 auto 12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            background: "#3ecf4c",
            color: "#fff",
            fontSize: "24px",
          }}
        >
          ✓
        </div>
        <h3 style={{ margin: "0 0 8px", fontSize: "18px", color: "#222" }}>
          {title}
        </h3>
        <p style={{ margin: "0 0 16px", fontSize: "14px", color: "#666" }}>
          {message}
        </p>
        <button
          type="button"
          onClick={onClose}
          style={{
            width: "100%",
            padding: "10px",
            background: "#3ecf4c",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
