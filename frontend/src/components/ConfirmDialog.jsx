export const ConfirmDialog = ({ open, message, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn-outline" onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>OK</button>
        </div>
      </div>
    </div>
  );
};