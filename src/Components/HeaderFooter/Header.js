import React from 'react';
import { auth } from '../../firebase/config';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../Store/AuthContext'

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';

function Header() {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login'); 
    });
  };



  const { user } = useAuth();

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <Link to={'/home'}>
          <div className="brandName">
            <OlxLogo />
          </div>
        </Link>
        <div className="placeSearch" >
          <Search />
          <input type="text" placeholder="Search city, area or locality" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input type="text" placeholder="Find car, mobile phone and more..." />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage">
          {
            user ? (
              <Link onClick={handleLogout}>Logout</Link>
            ) : (
              <Link to="/login">Login</Link>
            )
          }
          <hr />
        </div>
          <Link to={'/create'}>
            <div className="sellMenu">
              <SellButton />
              <div className="sellMenuContent">
                <SellButtonPlus />
                <span>SELL</span>
              </div>
            </div>
          </Link>
      </div>
    </div>
  );
}

export default Header;
