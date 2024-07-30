/* eslint-disable react/no-unescaped-entities */
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
      setEmail('');
      setPassword('');
      setError('');
      navigate('/user'); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center vh-100'
 >
      {/* Signup Form */}
      <div className="bg-light p-4 border border-secondary rounded shadow">

        {/* Top Heading */}
        <div className="mb-4">
          <h2 className='text-center text-primary'>
            Signup
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <input
              type="email"
              placeholder='Email Address'
              className='form-control'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              placeholder='Password'
              className='form-control'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Signup Button */}
          <div className="mb-4">
            <button
              type='submit'
              className='btn btn-primary w-100'
            >
              Signup
            </button>
          </div>
        </form>
        {error && <p className="text-danger">{error}</p>}

        <div>
          <h2 className='text-dark'>Have an account? <Link className='text-primary fw-bold' to={'/login'}>Login</Link></h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
