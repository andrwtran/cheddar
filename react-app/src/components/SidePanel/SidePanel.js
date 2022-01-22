import React from 'react';
import { NavLink } from 'react-router-dom';
import AccountList from '../AccountList/AccountList';
import "./SidePanel.css";

const SidePanel = () => {
  return (
    <div className='SidePanel'>
      <h2>Side Panel</h2>
      <AccountList />
      <div className='Transactions'>
        <NavLink to="/transactions"><h3>Transactions</h3></NavLink>
      </div>
      <div className='Categories'><h3>Categories</h3></div>
    </div>
  );
};

export default SidePanel;
