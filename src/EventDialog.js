import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function EventDialog({ title, onClose, children }) {
  const ref = useRef(null);
  useEffect(() => {
    const previous = document.activeElement;
    const dialog = ref.current;
    dialog.showModal();
    return () => {
      dialog.close();
      previous?.focus();
    };
  }, []);
  return createPortal(
    <dialog
      className="event-dialog"
      ref={ref}
      aria-labelledby="event-dialog-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <header className="event-dialog-header">
        <h2 id="event-dialog-title">{title}</h2>
        <button
          type="button"
          className="event-close"
          aria-label="Close dialog"
          onClick={onClose}
        >
          ×
        </button>
      </header>
      {children}
    </dialog>,
    document.body,
  );
}
