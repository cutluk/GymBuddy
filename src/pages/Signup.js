import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [exp, setExp] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      // create user in firebase 
      createUserWithEmailAndPassword(auth, email, password);

      console.log("Firebase Auth Success, Attempting to send data to backend")
      // send data to backend
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email:email,
                              password:password,
                              first_name:firstName,
                              last_name:lastName,
                              age:age,
                              gender:gender,
                              experience:exp,
                            }),
      });

      // return cluster of users
      const data = await response.json();
      console.log(data);

      console.log("Data sent to backend, attempting to navigate to home page")
      
      // Send to home page
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

        <input className='login-input'
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />

        <input className='login-input'
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input className='login-input'
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <div className="login-input">
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={(e) => setGender(e.target.value)}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={(e) => setGender(e.target.value)}

            />
            Female
          </label>
        </div>
        
        <input className='login-input'
          type="number"
          placeholder="Your Experience (1-10)"
          value={exp}
          onChange={(e) => setExp(e.target.value)}
        />
       
        <button className='login-button' type="submit">Sign up</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Signup;

