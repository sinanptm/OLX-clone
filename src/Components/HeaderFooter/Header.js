import React from 'react';
import { auth } from '../../firebase/config';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { useAuth } from '../../AuthContext'
function Header() {
  const navigate = useNavigate(); // Renamed from 'history' to 'navigate' for clarity

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login'); // Use navigate function to redirect to '/login' route
    });
  };

  const { user } = useAuth();

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <Link to={'/home'}>
          <div className="brandName">
            <OlxLogo></OlxLogo>
          </div>
        </Link>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {
            user ? (
              <Link onClick={handleLogout}>logout</Link>
            ) : (
              <Link to="/login">login</Link>
            )
          }
          <hr />
        </div>

        <Link to={'/create'}>
          <div className="sellMenu">
            <SellButton></SellButton>
            <div className="sellMenuContent">
              <SellButtonPlus></SellButtonPlus>
              <span>SELL</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
