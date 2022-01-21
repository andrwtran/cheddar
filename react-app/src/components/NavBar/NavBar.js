
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css"

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks = (
    <>
      <li>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </li>
    </>
  );

  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </>
    );
  };

  return (
    <nav className='NavBar'>
      <ul>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;
