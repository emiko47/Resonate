import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon";
export default function DiscardButton({
  dirty = true,
  onDiscard,
  subject = "changes",
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const dialog = useRef(null);
  const button = useRef(null);
  const titleId = useId();
  const bodyId = useId();
  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const trigger = button.current;
    element.showModal();
    return () => {
      element.close();
      trigger?.focus();
    };
  }, [open]);
  return (
    <>
      <button
        ref={button}
        type="button"
        className={className}
        onClick={() => (dirty ? setOpen(true) : onDiscard())}
      >
        <Icon name="trash" size={17} />
        Discard
      </button>
      {open &&
        createPortal(
          <dialog
            ref={dialog}
            className="discard-dialog"
            role="alertdialog"
            aria-labelledby={titleId}
            aria-describedby={bodyId}
            onCancel={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setOpen(false);
            }}
          >
            <div className="discard-symbol">
              <Icon name="warning" size={26} />
            </div>
            <h2 id={titleId}>Discard this {subject}?</h2>
            <p id={bodyId}>
              Your unsaved work will be lost. This cannot be undone.
            </p>
            <div className="discard-dialog-actions">
              <button autoFocus type="button" onClick={() => setOpen(false)}>
                Keep editing
              </button>
              <button
                type="button"
                className="danger-button"
                onClick={() => {
                  setOpen(false);
                  onDiscard();
                }}
              >
                <Icon name="trash" size={17} />
                Discard {subject}
              </button>
            </div>
          </dialog>,
          document.body,
        )}
    </>
  );
}
