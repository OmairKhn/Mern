import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error before making a request

    axios
      .post("http://localhost:3001/createUser", { name, email, age })
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((err) => {
        // Set the error message to display in the UI
        setError(
          err.response?.data?.message || "An error occurred. Please try again."
        );
        console.log(err);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="card p-4"
        style={{
          width: "400px",
          background: "rgba(0, 0, 0, 0.7)",
          borderRadius: "10px",
        }}
      >
        <h1 className="text-center mb-4" style={{ color: "white" }}>
          Create User
        </h1>
        {error && <p className="text-danger text-center">{error}</p>}{" "}
        {/* Error message display */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" style={{ color: "white" }}>
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" style={{ color: "white" }}>
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <small
              id="emailHelp"
              className="form-text"
              style={{ color: "white" }}
            >
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label htmlFor="age" style={{ color: "white" }}>
              Age
            </label>
            <input
              type="number"
              className="form-control"
              id="age"
              placeholder="Age"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
