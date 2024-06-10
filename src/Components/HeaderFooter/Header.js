import React from 'react';
import { auth } from '../../firebase/config';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useAuth } from '../../Provider/AuthContext'

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';

function Header() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = () => {
    signOut(auth).then(() => {
      navigate('/login');
    });
  };



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
        {user ?
          <div className="loginPage">
            <img
              width="40px"
              height="40px"
              src="https://external-preview.redd.it/LYMHylvGTOGWxcQgRKdZcAsyz4i6HGI01g-8hI9_IFw.jpg?auto=webp&s=c5fa678af27763e09c6e80c0aa6caa5c6d338ff9"
              alt="logo"
            />
            <span>&nbsp;&nbsp;&nbsp;{user.displayName}</span>
          </div> : <span style={{cursor:'pointer' , fontWeight:'bold', fontSize:'18px'}} onClick={() => navigate('/login')}>Login</span>
        }

        {user &&
          <div className="loginPage">
            <span style={{ cursor: 'pointer' }} onClick={handleLogOut}>Logout</span>
            <hr />
          </div>
        }

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
