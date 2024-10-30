// Signup.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../FirebaseConfig";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login'); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-light p-4 border border-secondary rounded shadow">
        <h2 className="text-center text-primary">Signup</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" className="form-control mb-3"
            onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="form-control mb-3"
            onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn btn-primary w-100">Signup</button>
        </form>
        {error && <p className="text-danger">{error}</p>}
        <p>Have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
}

export default Signup;
