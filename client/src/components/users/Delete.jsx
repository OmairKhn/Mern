import React from 'react'

const Delete = ({ selectedUser, onClose, onConfirm }) => {
    return (
    <div>

<div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <p>Are you sure you want to delete {selectedUser.name}?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
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
    </div>
  )
}

export default Delete