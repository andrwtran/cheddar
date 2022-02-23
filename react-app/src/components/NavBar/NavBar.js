
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css"

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) return (
    <nav className='NavBar' style={{width:"99%"}}>
      <span id='NavBarLogo'><i class="fas fa-cheese" style={{marginRight: 3, marginLeft: 2}}></i>CHEDDAR</span>
      <ul>
        <li>
          <span id='WelcomeMessage'>{`Welcome, ${sessionUser.username}!`}</span>
        </li>
        <li style={{marginLeft: 8}} className='NavBarDivider'>|</li>
        <li>
          <NavLink to='/'>
            <button>Home <i className="fas fa-home" /></button>
          </NavLink>
        </li>
        <li className='NavBarDivider'>|</li>
        <li>
          <LogoutButton />
        </li>
      </ul>
    </nav>
    );

  return (
    <nav className='NavBar' style={{display: "block"}}>
      <ul style={{justifyContent: "space-around", marginTop: 0}}>
        <li>
          <NavLink to='/'>
            <button>Home <i className="fas fa-home" /></button>
          </NavLink>
        </li>
        <li className='NavBarDivider'>|</li>
        <li>
          <NavLink to='/login'>
            <button>Login <i className="fas fa-sign-in-alt" /></button>
          </NavLink>
        </li>
        <li className='NavBarDivider'>|</li>
        <li>
          <NavLink to='/sign-up'>
            <button>Sign Up <i className="fas fa-user-plus" /></button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
