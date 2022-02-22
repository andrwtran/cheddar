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
  const [isFilterDate, setIsFilterDate] = useState(false);
  const [filterStyle, setFilterStyle] = useState("hide");
  const [isSearch, setIsSearch] = useState(false);

  const toggleMax = (e) => {
    e.preventDefault();
    setIsMax(true);
  };

  const toggleMin = (e) => {
    e.preventDefault();
    setIsMax(false);
  };

  const filterCatClick = (e) => {
    e.preventDefault();
    e.stopPropagation()
    setIsFilterCat(true);
  };

  const filterAccClick = (e) => {
    e.preventDefault();
    e.stopPropagation()
    setIsFilterAcc(true);
  };

  const filterDateClick = (e) => {
    e.preventDefault();
    e.stopPropagation()
    setIsFilterDate(true);
  };

  const searchClick = (e) => {
    e.preventDefault();
    // e.stopPropagation()
    setIsSearch(true);
  }

  const filterShowClick = (e) => {
    e.preventDefault();
    // e.stopPropagation()
    if (filterStyle === "hide") {
      setFilterStyle("")
    } else {
      setFilterStyle("hide")
    };
  }

  if (!isMax) {
    return (
    <div className='SidePanel' id='MinSidePanel'>
      <span id={'SideMax'}>
          <button onClick={toggleMax}><i class="fas fa-window-maximize" /></button>
      </span>
      <AccountList isMax={isMax} />
      <div className='Transactions'>
        <h3>Transactions</h3>
        <button className='NewTransactionButton'><i className="fas fa-plus-square" /> Add</button>
        <ul>
          <li><i className="fas fa-money-bill-wave" /> <NavLink to="/transactions">All</NavLink></li>
          <li style={{cursor: 'pointer'}} onClick={filterShowClick}><i className="fas fa-money-bill-wave" /> Filter
            <ul className={filterStyle}>
              <li><i className="fas fa-money-bill-wave" /> <span className='FilterButtons' onClick={filterCatClick}>by Category</span></li>
              <li><i className="fas fa-money-bill-wave" /> <span className='FilterButtons' onClick={filterAccClick}>by Account</span></li>
              <li><i className="fas fa-money-bill-wave" /> <span className='FilterButtons' onClick={filterDateClick}>by Date</span></li>
            </ul>
          </li>
          <li><i className="fas fa-money-bill-wave" /> <span className='FilterButtons' onClick={searchClick}>Search</span></li>
        </ul>
      </div>
      {isFilterCat && <TransactionFilter setIsFilterCat={setIsFilterCat} setIsFilterAcc={setIsFilterAcc} setIsFilterDate={setIsFilterDate} isFilterCat={isFilterCat} isFilterAcc={isFilterAcc} isFilterDate={isFilterDate}/>}
      {isFilterAcc && <TransactionFilter setIsFilterCat={setIsFilterCat} setIsFilterAcc={setIsFilterAcc} setIsFilterDate={setIsFilterDate} isFilterCat={isFilterCat} isFilterAcc={isFilterAcc} isFilterDate={isFilterDate}/>}
      {isFilterDate && <TransactionFilter setIsFilterCat={setIsFilterCat} setIsFilterAcc={setIsFilterAcc} setIsFilterDate={setIsFilterDate} isFilterCat={isFilterCat} isFilterAcc={isFilterAcc} isFilterDate={isFilterDate}/>}
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
        <button className='NewTransactionButton'>New Transaction</button>
        <ul>
          <li><i className="fas fa-money-bill-wave" /> <NavLink to="/transactions">All</NavLink></li>
          <li style={{cursor: 'pointer'}} onClick={filterShowClick}><i className="fas fa-money-bill-wave" /> Filter
            <ul className={filterStyle}>
              <li><i className="fas fa-money-bill-wave" /> <span className='FilterButtons' onClick={filterCatClick}>by Category</span></li>
              <li><i className="fas fa-money-bill-wave" /> <span className='FilterButtons' onClick={filterAccClick}>by Account</span></li>
              <li><i className="fas fa-money-bill-wave" /> <span className='FilterButtons' onClick={filterDateClick}>by Date</span></li>
            </ul>
          </li>
          <li><i className="fas fa-money-bill-wave" /> <span className='FilterButtons' onClick={searchClick}>Search</span></li>
        </ul>
      </div>
      {isFilterCat && <TransactionFilter setIsFilterCat={setIsFilterCat} setIsFilterAcc={setIsFilterAcc} setIsFilterDate={setIsFilterDate} isFilterCat={isFilterCat} isFilterAcc={isFilterAcc} isFilterDate={isFilterDate}/>}
      {isFilterAcc && <TransactionFilter setIsFilterCat={setIsFilterCat} setIsFilterAcc={setIsFilterAcc} setIsFilterDate={setIsFilterDate} isFilterCat={isFilterCat} isFilterAcc={isFilterAcc} isFilterDate={isFilterDate}/>}
      {isFilterDate && <TransactionFilter setIsFilterCat={setIsFilterCat} setIsFilterAcc={setIsFilterAcc} setIsFilterDate={setIsFilterDate} isFilterCat={isFilterCat} isFilterAcc={isFilterAcc} isFilterDate={isFilterDate}/>}
    </div>
  );
};

export default SidePanel;
