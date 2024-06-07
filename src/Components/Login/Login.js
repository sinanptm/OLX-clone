// src/components/Login/Login.js
import React, { useState } from 'react';
import { auth } from '../../firebase/config';
import { Link } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-toastify';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User Logged In Successfully", {
          position: "top-right",
      });
      console.log('done');
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
      });
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="290px" height="250px" alt="Olx-logo" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}

export default Login;
