import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AccountList from '../AccountList/AccountList';
import TransactionFilter from '../TransactionFilter/TransactionFilter';
import "./SidePanel.css";

const SidePanel = () => {
  const [isMax, setIsMax] = useState(false);
  const [isFilterCat, setIsFilterCat] = useState(false);
  const [isFilterAcc, setIsFilterAcc] = useState(false);

  const toggleMax = (e) => {
    e.preventDefault();
    setIsMax(true);
  };

  const toggleMin = (e) => {
    e.preventDefault();
    setIsMax(false);
  };

  const filterCatClick = () => {
    setIsFilterCat(true);
  };

  const filterAccClick = () => {
    setIsFilterAcc(true);
  };

  if (!isMax) {
    return (
    <div className='SidePanel' id='MinSidePanel'>
      <span id={'SideMax'}>
          <button onClick={toggleMax}><i class="fas fa-window-maximize" /></button>
      </span>
      <AccountList isMax={isMax} />
      <div className='Transactions'>
        <h3>Transactions</h3>
        <ul>
          <li><i className="fas fa-money-bill-wave" /> <NavLink to="/transactions">All</NavLink></li>
          <li><i className="fas fa-money-bill-wave" /> <span className='FilterButtons' onClick={filterCatClick}>by Category</span></li>
          <li><i className="fas fa-money-bill-wave" /> <span className='FilterButtons' onClick={filterAccClick}>by Account</span></li>
        </ul>
      </div>
      {isFilterCat && <TransactionFilter setIsFilterCat={setIsFilterCat} setIsFilterAcc={setIsFilterAcc} isFilterCat={isFilterCat} isFilterAcc={isFilterAcc}/>}
      {isFilterAcc && <TransactionFilter setIsFilterCat={setIsFilterCat} setIsFilterAcc={setIsFilterAcc} isFilterCat={isFilterCat} isFilterAcc={isFilterAcc}/>}
    </div>
    );
  };

  return (
    <div className='SidePanel' id='MaxSidePanel'>
      <span id={'SideMin'}>
          <button onClick={toggleMin}><i class="fas fa-window-minimize" /></button>
      </span>
      <AccountList isMax={isMax} />
      <div className='Transactions'>
        <h3>Transactions</h3>
        <ul>
          <li><i className="fas fa-money-bill-wave" /> <NavLink to="/transactions">All</NavLink></li>
          <li><i className="fas fa-money-bill-wave" /> <span className='FilterButtons' onClick={filterCatClick}>by Category</span></li>
          <li><i className="fas fa-money-bill-wave" /> <span className='FilterButtons' onClick={filterAccClick}>by Account</span></li>
        </ul>
      </div>
      {isFilterCat && <TransactionFilter setIsFilterCat={setIsFilterCat} setIsFilterAcc={setIsFilterAcc} isFilterCat={isFilterCat} isFilterAcc={isFilterAcc}/>}
      {isFilterAcc && <TransactionFilter setIsFilterCat={setIsFilterCat} setIsFilterAcc={setIsFilterAcc} isFilterCat={isFilterCat} isFilterAcc={isFilterAcc}/>}
    </div>
  );
};

export default SidePanel;
