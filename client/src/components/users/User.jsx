// src/components/User.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUsers,
  deleteUser,
  updateUser,
  setSearchQuery,
  setCurrentPage
} from "../../redux/slices/usersSlice";
import {EditUser} from "./Edituser";
import Delete from "./Delete";
import { Dropdown, DropdownButton } from 'react-bootstrap'; // Import Dropdown and DropdownButton

const User = () => {
  const dispatch = useDispatch();
  const { users, totalPages, currentPage, searchQuery, status } = useSelector((state) => state.users);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ id: null, name: "" });
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedAge, setEditedAge] = useState("");

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, search: searchQuery }));
  }, [dispatch, currentPage, searchQuery]);

  const handleDelete = (id, name) => {
    setSelectedUser({ id, name });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    dispatch(deleteUser(selectedUser.id));
    setShowDeleteModal(false);
  };

  const handleEdit = (id, name, email, age) => {
    setSelectedUser({ id, name });
    setEditedName(name);
    setEditedEmail(email);
    setEditedAge(age);
    setShowEditModal(true);
  };

  const handleEditSubmit = () => {
    const updatedUserData = { name: editedName, email: editedEmail, age: editedAge };
    dispatch(updateUser({ id: selectedUser.id, data: updatedUserData }));
    setShowEditModal(false);
  };

  const handleSearchChange = (event) => {
    dispatch(setSearchQuery(event.target.value));
  };

  return (
    <div className="container my-4">
    <div className="d-flex   justify-content-between align-items-center mb-3">
      <h1 className="mt-3">All Employees</h1>
      <Link to="/create">
        <button className="btn btn-primary mt-3 mt-md-0">Add Employee</button>
      </Link>
    </div>

    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Search Here"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ borderRadius: "10px", overflow: "hidden" }}
      />
      <div className="input-group-append ml-2">
        <button
          className="btn btn-outline-secondary"
          onClick={() => dispatch(fetchUsers({ page: 1, search: searchQuery }))}
        >
          🔎 Search
        </button>
      </div>
    </div>

    <div className="table-responsive w-100">
      <table className="table table-striped text-center" style={{ borderRadius: '10px', overflow: 'hidden' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th style={{ width: '150px' }}>Email</th>
            <th>Age</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {user.email} {/* Truncate text with ellipsis if it's too long */}
        </td>
                      <td>{user.age}</td>
              <td>
                <div className="d-none d-md-flex justify-content-center">
                  <button 
                    className="btn btn-danger btn-sm mr-2"
                    onClick={() => handleDelete(user._id, user.name)}
                  >
                    Delete
                  </button>
                  <button 
                    className="btn btn-primary btn-sm"
                    onClick={() => handleEdit(user._id, user.name, user.email, user.age)}
                  >
                    Edit
                  </button>
                </div>
                <div className="d-md-none">
                  <DropdownButton id="dropdown-basic-button"  size="sm" >
                    <Dropdown.Item onClick={() => handleEdit(user._id, user.name, user.email, user.age)}>Edit</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleDelete(user._id, user.name)}>Delete</Dropdown.Item>
                  </DropdownButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="d-flex justify-content-between mt-3">
      <button
        className="btn btn-secondary"
        onClick={() => dispatch(setCurrentPage(currentPage - 1))}
        disabled={currentPage === 1}
      >
        Previous Page
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => dispatch(setCurrentPage(currentPage + 1))}
        disabled={currentPage === totalPages}
      >
        Next Page
      </button>
    </div>

    {/* Delete Confirmation Modal */}
    {showDeleteModal && (
      <Delete
        selectedUser={selectedUser}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
      />
    )}

    {/* Edit Modal */}
    {showEditModal && (
      <EditUser
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        editedName={editedName}
        editedEmail={editedEmail}
        editedAge={editedAge}
        setEditedName={setEditedName}
        setEditedEmail={setEditedEmail}
        setEditedAge={setEditedAge}
        handleEditSubmit={handleEditSubmit}
      />
    )}
  </div>
  );
};

export default User;
