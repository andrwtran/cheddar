
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
        <NavLink to='/' exact={true} activeClassName='active'>
          Home
        </NavLink>
      </li>
      <li>|</li>
      <li>
        <NavLink to='/login' exact={true} activeClassName='active'>
          Login
        </NavLink>
      </li>
      <li>|</li>
      <li>
        <NavLink to='/sign-up' exact={true} activeClassName='active'>
          Sign Up
        </NavLink>
      </li>
    </>
  );

  if (sessionUser) {
    console.log('!!!!!!!!!!!', sessionUser)
    sessionLinks = (
      <>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>|</li>
        <li>
          {/* <NavLink to='/users' exact={true} activeClassName='active'>
            Users
          </NavLink> */}
          {`Welcome, ${sessionUser.username}!`}
        </li>
        <li>|</li>
        <li>
          <LogoutButton />
        </li>
      </>
    );
  };

  return (
    <nav className='NavBar'>
      <ul>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;
