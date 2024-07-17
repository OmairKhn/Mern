import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchUsers = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/getAllUsers?page=${page}&pageSize=5`
      );
      const { users, totalPages } = response.data;
      setUsers(users);
      setTotalPages(totalPages);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

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

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/deleteUser/${id}`)
      .then((res) => {
        console.log("User deleted:", res);
        fetchUsers(currentPage); // Refresh the users list after deleting a user
      })
      .catch((err) => console.error(`Error deleting user with id: ${id}`, err));
  };

  return (
    <div>
      <div className="table1">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Search Here"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
          />
          <div class="input-group-append">
            {/* <button class="btn btn-outline-secondary" type="button">Button</button> */}
            <button className="btn btn-outline-secondary">🔎 Search</button>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
              <th scope="col">Action</th>
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
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                  <button className="btn btn-primary">
                    <Link to={`/update/${user._id}`} className="text-white">
                      Edit
                    </Link>
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
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
