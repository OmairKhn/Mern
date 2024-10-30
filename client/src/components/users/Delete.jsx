import React from "react";

const Delete = ({ selectedUser, onClose, onConfirm }) => {
  return (
    <div className="modal  d-block" t>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <p style={{ color: "black" }}>
              Are you sure you want to delete {selectedUser.name}?
            </p>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onConfirm}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delete;
