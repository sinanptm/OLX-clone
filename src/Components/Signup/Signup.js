import React, { useState } from 'react';
import { Link } from'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';

export default function Signup() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      <div className="signupParentDiv">
        <img width="290px" height="250px" src={Logo} alt="OLX Logo" />
        <form>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="input" value={userName}
            onChange={(e) => setUserName(e.target.value)}
            type="text" id="username"  name="username"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input  className="input"   value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" id="email" name="email" />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input" value={phone} onChange={(e) => setPhone(e.target.value)}
            type="number" id="phone" name="phone"/>
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input" value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" id="password" name="password"/>
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
        <Link to={'/login'}>Login</Link>
      </div>
    </>
  );
}
