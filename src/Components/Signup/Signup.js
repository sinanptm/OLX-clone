import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../olx-logo.png';  
import './Signup.css';  
import { auth, db } from '../../firebase/config';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';

export default function Signup() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validateInput = debounce((name, value) => {
      let error = '';

      if (!value.trim()) {
        error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
      }

      if (name === 'email' && !error) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          error = 'Invalid email format';
        }
      }

      if (name === 'phone' && !error) {
        if (value.length !== 10) {
          error = 'Phone number should be 10 digits';
        }
      }

      if (name === 'password' && !error) {
        if (value.length <= 5) {
          error = 'Password should be more than 6 characters';
        }
      }

      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    }, 300);

    return () => {
      // Clear any pending debounced validations when component unmounts
      validateInput.cancel();
    };
  }, []);

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setErrors({});

    // Perform validation checks
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userName.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, userName: 'Username is required' }));
      return;
    }

    if (!email.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Email is required' }));
      return;
    } else if (!emailPattern.test(email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: 'Invalid email format' }));
      return;
    }

    if (!phone.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: 'Phone number is required' }));
      return;
    } else if (phone.length !== 10) {
      setErrors((prevErrors) => ({ ...prevErrors, phone: 'Phone number should be 10 digits' }));
      return;
    }

    if (!password.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password is required' }));
      return;
    } else if (password.length <= 5) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password should be more than 6 characters' }));
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: userName
      });
      await setDoc(doc(db, 'users', user.uid), {
        userName,
        email,
        phone
      });

      toast.success("Registered successfully", {
        position: 'top-center',
        autoClose: 1200,
      });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error('You are already a user, Please login', {
          position: 'top-center',
        });
      } else {
        toast.error('Registration failed. Please try again.', {
          position: 'top-center',
        });
      }
    }
  };

  return (
    <div className="signupParentDiv">
      <Link to={'/home'}>
        <img width="290px" height="250px" src={Logo} alt="OLX Logo" />
      </Link>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <br />
        <input
          className={`input ${errors.userName ? 'error' : ''}`}
          value={userName}
          onChange={handleUserName}
          type="text"
          id="username"
          name="username"
          required
        />
        {errors.userName && <div className="error">{errors.userName}</div>}
        <br />
        <label htmlFor="email">Email</label>
        <br />
        <input
          className={`input ${errors.email ? 'error' : ''}`}
          value={email}
          onChange={handleEmail}
          type="email"
          id="email"
          name="email"
          required
        />
        {errors.email && <div className="error">{errors.email}</div>}
        <br />
        <label htmlFor="phone">Phone</label>
        <br />
        <input
          className={`input ${errors.phone ? 'error' : ''}`}
          value={phone}
          onChange={handlePhone}
          type="tel"
          id="phone"
          name="phone"
          pattern="[0-9]{10}"
          required
        />
        {errors.phone && <div className="error">{errors.phone}</div>}
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          className={`input ${errors.password ? 'error' : ''}`}
          value={password}
          onChange={handlePassword}
          type="password"
          id="password"
          name="password"
          minLength="6"
          required
        />
        {errors.password && <div className="error">{errors.password}</div>}
        <br />
        <button type="submit">Signup</button>
      </form>
      <Link to={'/login'}>Login</Link>
    </div>
  );
}
