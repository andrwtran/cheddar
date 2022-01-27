import React from 'react';
import { NavLink } from 'react-router-dom';
import AccountList from '../AccountList/AccountList';
import "./SidePanel.css";

const SidePanel = () => {

  return (
    <div className='SidePanel'>
      {/* <h2>Side Panel</h2> */}
      <AccountList />
      <div className='Transactions'>
        <h3>Transactions</h3>
        <ul>
          <li><i className="fas fa-money-bill-wave" /> <NavLink to="/transactions">All</NavLink></li>
          <li><i className="fas fa-money-bill-wave" /> <NavLink to="/transactions/19">Shopping</NavLink></li>
          <li><i className="fas fa-money-bill-wave" /> <NavLink to="/transactions/13">Groceries</NavLink></li>
          <li><i className="fas fa-money-bill-wave" /> <NavLink to="/transactions/6">Dining & Drinks</NavLink></li>
        </ul>
      </div>
    </div>
  );
};

export default SidePanel;
