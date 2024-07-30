import React from "react";

const EditUser = ({
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
  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit User</h5>
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
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
