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
  const [error, setError] = useState({});

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({}); 

    try {
      // Validate form fields
      if (!userName.trim()) {
        setError({ field: 'userName', message: 'Username is required' });
        return;
      }
      if (!email.trim()) {
        setError({ field: 'email', message: 'Email is required' });
        return;
      }
      if (!phone.trim()) {
        setError({ field: 'phone', message: 'Phone number is required' });
        return;
      }
      if (phone.length !== 10) {
        setError({ field: 'phone', message: 'Phone number should be 10 digits' });
        return;
      }
      if (!password.trim()) {
        setError({ field: 'password', message: 'Password is required' });
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      userCredential.user.displayName = userName
      await setDoc(doc(db, 'users', user.uid), {
        userName,
        email,
        phone
      });

      toast.success("Registered successfully",{
        position:'top-center',
        autoClose: 1200,
      })
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error('You are already a user, Please login', {
          position: 'top-center',
        });
      }
      
    }
  };

  return (
    <div className="signupParentDiv">
      <img width="290px" height="250px" src={Logo} alt="OLX Logo" />
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <br />
        <input
          className={`input ${error.field === 'userName' ? 'error' : ''}`}
          value={userName}
          onChange={handleUserName}
          type="text"
          id="username"
          name="username"
          required
        />
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          className={`input ${error.field === 'email' ? 'error' : ''}`}
          value={email}
          onChange={handleEmail}
          type="email"
          id="email"
          name="email"
          required
        />
        <br />
        <label htmlFor="phone">Phone</label>
        <br />
        <input
          className={`input ${error.field === 'phone' ? 'error' : ''}`}
          value={phone}
          onChange={handlePhone}
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
          className={`input ${error.field === 'password' ? 'error' : ''}`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          id="password"
          name="password"
          minLength="6"
          required
        />
        <br />
        {error.message && <div className="error">{error.message}</div>} {/* Render error message */}
        <button type="submit">Signup</button>
      </form>
      <Link to={'/login'}>Login</Link>
    </div>
  );
}
