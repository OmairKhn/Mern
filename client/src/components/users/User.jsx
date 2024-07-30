import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Edituser from "./Edituser";
import Delete from "./Delete";

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({ id: null, name: "" });
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedAge, setEditedAge] = useState("");
  
  // Fetch users from server based on current page and search query
  const fetchUsers = async (page, search = "") => {
    try {
      const response = await axios.get(
        `http://localhost:3001/getAllUsers?page=${page}&pageSize=5&search=${search}`
      );
      const { users, totalPages } = response.data;
      setUsers(users);
      setTotalPages(totalPages);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  // Load users when component mounts or dependencies change
  useEffect(() => {
    fetchUsers(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  // Handle pagination
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Open modal for deleting user
  const handleDelete = (id, name) => {
    setSelectedUser({ id, name });
    setShowDeleteModal(true);
  };

  // Open modal for editing user
  const handleEdit = (id, name, email, age) => {
    setSelectedUser({ id, name });
    setEditedName(name);
    setEditedEmail(email);
    setEditedAge(age);
    setShowEditModal(true);
  };

  // Confirm deletion of user
  const confirmDelete = () => {
    if (selectedUser.id) {
      axios
        .delete(`http://localhost:3001/deleteUser/${selectedUser.id}`)
        .then((res) => {
          console.log("User deleted:", res);
          fetchUsers(currentPage, searchQuery); // Refresh user list after deletion
          setShowDeleteModal(false);
        })
        .catch((err) =>
          console.error(`Error deleting user with id: ${selectedUser.id}`, err)
        );
    }
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Update user data after editing
  const handleEditSubmit = () => {
    const updatedUserData = {
      name: editedName,
      email: editedEmail,
      age: editedAge,
    };

    axios
      .put(
        `http://localhost:3001/updateUser/${selectedUser.id}`,
        updatedUserData
      )
      .then((res) => {
        console.log("User updated:", res.data);
        fetchUsers(currentPage, searchQuery); // Refresh user list after update
        setShowEditModal(false); // Close edit modal after update
      })
      .catch((err) => console.error("Error updating user:", err));
  };

  return (
    <div    >
      <div className="table1 " >
        <div className="tab_Header">
          <h1>All Users</h1>
          <div>
            <Link to="/create">
              <button className="btn btn-primary">Add user</button>
            </Link>
          </div>
        </div>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Here"
            aria-label="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{borderRadius: '10px', overflow: 'hidden' }}
          />
          <div className="input-group-append" style={{ marginLeft: "5px" }}>
            <button
              className="btn btn-outline-secondary"
              onClick={() => fetchUsers(1, searchQuery)}
            >
              🔎 Search
            </button>
          </div>
        </div>
        <table className="table" style={{borderRadius: '10px', overflow: 'hidden' }}>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(user._id, user.name)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      handleEdit(user._id, user.name, user.email, user.age)
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous Page
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next Page
          </button>
        </div>
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
        <Edituser
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
