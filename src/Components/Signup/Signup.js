// src/components/Signup/Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { auth, db } from '../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function Signup() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        userName,
        email,
        phone
      });

      console.log('done');
      toast.success("Registered successfully",{
        position:'top-center',
      })
    } catch (error) {
      setError(error.message);
      console.error('Error creating user or saving data:', error);
      toast.error(error.message,{
        position:'top-center',
      })
    }
  };

  return (
    <div className="signupParentDiv">
      <img width="290px" height="250px" src={Logo} alt="OLX Logo" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <br />
        <input
          className="input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          id="username"
          name="username"
          required
        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="email"
          name="email"
          required
        />
        <br />
        <label htmlFor="phone">Phone</label>
        <br />
        <input
          className="input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="tel"
          id="phone"
          name="phone"
          pattern="[0-9]{10}"
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
          minLength="6"
          required
        />
        <br />
        <br />
        {error && <div className="error">{error}</div>}
        <button type="submit">Signup</button>
      </form>
      <Link to={'/login'}>Login</Link>
    </div>
  );
}
