import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      createUserWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        navigate('/home')
      }, 300)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className='login-title'>Sign Up</h1>
        <input className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input className='login-input'
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='login-button' type="submit">Sign up</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;
