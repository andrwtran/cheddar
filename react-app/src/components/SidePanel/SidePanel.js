import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AccountList from '../AccountList/AccountList';
import "./SidePanel.css";

const SidePanel = () => {
  const [isMax, setIsMax] = useState(false)

  const toggleMax = (e) => {
    e.preventDefault();
    setIsMax(true);
  };

  const toggleMin = (e) => {
    e.preventDefault();
    setIsMax(false);
  };

  if (!isMax) {
    return (
      <div className='SidePanel' id='MinSidePanel'>
      {/* <h2>Side Panel</h2> */}
      <span id={'SideMax'}>
          <button onClick={toggleMax}><i class="fas fa-window-maximize" /></button>
      </span>
      <AccountList isMax={isMax} />
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

  return (
    <div className='SidePanel' id='MaxSidePanel'>
      {/* <h2>Side Panel</h2> */}
      <span id={'SideMin'}>
          <button onClick={toggleMin}><i class="fas fa-window-minimize" /></button>
      </span>
      <AccountList isMax={isMax} />
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
