// Login.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../FirebaseConfig";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/'); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-light p-4 border border-secondary rounded shadow">
        <h2 className="text-center text-primary">Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" className="form-control mb-3"
            onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" className="form-control mb-3"
            onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        {error && <p className="text-danger">{error}</p>}
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  );
}

export default Login;
