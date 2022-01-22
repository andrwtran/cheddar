import React from 'react';
import AccountList from '../AccountList/AccountList';
import "./SidePanel.css";

const SidePanel = () => {
  return (
    <div className='SidePanel'>
      <h2>Side Panel</h2>
      <AccountList />
      <div className='Transactions'><h3>Transactions</h3></div>
      <div className='Categories'><h3>Categories</h3></div>
    </div>
  );
};

export default SidePanel;
