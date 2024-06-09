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

    if (!email.trim()) {
      toast.error("Please enter your email", { position: "top-right" });
      return;
    }

    if (!password.trim()) {
      toast.error("Please enter your password", { position: "top-right" });
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("✅ Logged in ", { position: "top-right", autoClose: 2000 });

    } catch (error) {
      if (error.code === 'auth/invalid-credential')
        toast.error("Email or Password is incorrect", { position: "top-right" });
      else toast.error(error.code)
    }
  };

  return (
    <div>
      <div className="loginParentDiv">
      <Link to={'/home'}>
      <img width="290px" height="250px" src={Logo} alt="OLX Logo" />
      </Link>
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
