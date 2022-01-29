
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogoutButton from '../auth/LogoutButton';
import "./NavBar.css"

const NavBar = () => {
  const sessionUser = useSelector(state => state.session.user);

  // let sessionLinks = (
  //   <>
  //     <li>
  //       <NavLink to='/'>
  //         <button>Home <i className="fas fa-home" /></button>
  //       </NavLink>
  //     </li>
  //     <li>|</li>
  //     <li>
  //       <NavLink to='/login'>
  //         <button>Login <i className="fas fa-sign-in-alt" /></button>
  //       </NavLink>
  //     </li>
  //     <li>|</li>
  //     <li>
  //       <NavLink to='/sign-up'>
  //         <button>Sign Up <i className="fas fa-user-plus" /></button>
  //       </NavLink>
  //     </li>
  //   </>
  // );

  if (sessionUser) return (
    <nav className='NavBar' style={{width:"95%"}}>
      <ul>
        <li>
          <NavLink to='/'>
            <button>Home <i className="fas fa-home" /></button>
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
      </ul>
    </nav>
    // sessionLinks = (
    //   <>
    //     <li>
    //       <NavLink to='/'>
    //         <button>Home <i className="fas fa-home" /></button>
    //       </NavLink>
    //     </li>
    //     <li>|</li>
    //     <li>
    //       {/* <NavLink to='/users' exact={true} activeClassName='active'>
    //         Users
    //       </NavLink> */}
    //       {`Welcome, ${sessionUser.username}!`}
    //     </li>
    //     <li>|</li>
    //     <li>
    //       <LogoutButton />
    //     </li>
    //   </>
    );

  return (
    <nav className='NavBar'>
      <ul>
        <li>
          <NavLink to='/'>
            <button>Home <i className="fas fa-home" /></button>
          </NavLink>
        </li>
        <li>|</li>
        <li>
          <NavLink to='/login'>
            <button>Login <i className="fas fa-sign-in-alt" /></button>
          </NavLink>
        </li>
        <li>|</li>
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
