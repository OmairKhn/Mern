import React, { useEffect } from "react";

export const EditUser = ({
  show,
  onClose,
  editedName,
  editedEmail,
  editedAge,
  setEditedName,
  setEditedEmail,
  setEditedAge,
  handleEditSubmit,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!show) return null;

  return (
    <div className="modal  d-block"  >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
            <button
              type="button"
              className="close"
              onClick={onClose}
              aria-label="Close"
            >
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label htmlFor="editedName">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="editedName"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editedEmail">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="editedEmail"
                  value={editedEmail}
                  onChange={(e) => setEditedEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="editedAge">Age:</label>
                <input
                  type="number"
                  className="form-control"
                  id="editedAge"
                  value={editedAge}
                  onChange={(e) => setEditedAge(e.target.value)}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-primary mx-2">Save Changes</button>
                <button type="button" className="btn btn-secondary mx-2" onClick={onClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
