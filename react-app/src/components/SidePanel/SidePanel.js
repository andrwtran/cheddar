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
        <h3>Transactions</h3>
        <ul>
          <li><i className="fas fa-money-bill-wave" /> <NavLink to="/transactions">All</NavLink></li>
          <li><i className="fas fa-money-bill-wave" /> Recent</li>
          <li><i className="fas fa-money-bill-wave" /> Dining & Drinks</li>
          <li><i className="fas fa-money-bill-wave" /> Groceries</li>
          <li><i className="fas fa-money-bill-wave" /> Shopping</li>
        </ul>
      </div>
    </div>
  );
};

export default SidePanel;
