import React, { useState } from 'react';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../css/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setTimeout(() => {
        navigate('/home')
      }, 300)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      {error && <p>User not found. Please Sign Up.</p>}
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 className='login-title'>Gym Buddy Login</h1>
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
        <button className="login-button" type="submit">Log in</button>
        <div className="signupmessage">Don't have an account?</div>
        <a className="sign-up-button" href="/signup">Sign up</a>
      </form>
      
      

    </div>
  );
};

export default Login;
