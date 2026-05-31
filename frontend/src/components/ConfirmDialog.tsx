interface Props {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDialog({ message, onConfirm, onCancel }: Props) {
  return (
    <div className="confirm-dialog__overlay" onClick={onCancel}>
      <div className="confirm-dialog__card" onClick={(e) => e.stopPropagation()}>
        <h3 className="confirm-dialog__title">Delete Post</h3>
        <p className="confirm-dialog__message">{message}</p>
        <div className="confirm-dialog__actions">
          <button className="confirm-dialog__cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="confirm-dialog__confirm" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
