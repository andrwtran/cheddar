import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AccountList from '../AccountList/AccountList';
import TransactionFilter from '../TransactionFilter/TransactionFilter';
import TransactionAdd from '../TransactionAdd/TransactionAdd';
import TransactionSearch from '../TransactionSearch/TransactionSearch';
import { getBudgets } from '../../store/budget';
import { getTransactions } from '../../store/transaction';
import { getCategories } from '../../store/category';
import { AnimatePresence } from 'framer-motion';
import "./SidePanel.css";

const SidePanel = () => {
  const dispatch = useDispatch()

  const [isMax, setIsMax] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isFilterCat, setIsFilterCat] = useState(false);
  const [isFilterAcc, setIsFilterAcc] = useState(false);
  const [isFilterDate, setIsFilterDate] = useState(false);
  const [filterStyle, setFilterStyle] = useState("hide");
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    dispatch(getBudgets());
    dispatch(getTransactions());
    dispatch(getCategories());
  }, [dispatch]);

  const accounts = useSelector((state) => state.account.byId);
  const categories = useSelector((state) => state.category);
  const transactions = useSelector((state) => state.transaction.all);

  const toggleMax = (e) => {
    e.preventDefault();
    setIsMax(true);
  };

  const toggleMin = (e) => {
    e.preventDefault();
    setIsMax(false);
  };

  const toggleAdd = (e) => {
    e.preventDefault();

    if (!Object.keys(accounts).length) {
      return alert("You must create an account before creating any transactions.")
    };

    setIsAdd(!isAdd);
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
    e.stopPropagation()
    setIsSearch(true);
  }

  const filterShowClick = (e) => {
    e.preventDefault();
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
          <button onClick={toggleMax}><i class="fa-solid fa-window-maximize" /></button>
      </span>
      <AccountList isMax={isMax} />
      <div className='Transactions'>
        <h3>Transactions</h3>
        <button className='NewTransactionButton' onClick={toggleAdd}><i class="fa-solid fa-square-plus" /> Add</button>
        <AnimatePresence
          key="new-transaction-modal"
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
        >
          {isAdd && <TransactionAdd accounts={accounts} setIsAdd={setIsAdd} categories={categories} />}
        </AnimatePresence>
        <ul>
          <li><i className="fas fa-money-bill-wave" /> <NavLink to="/transactions">All</NavLink></li>
          <li style={{cursor: 'pointer'}} onClick={filterShowClick}><i class="fa-solid fa-money-bill-wave" /> Filter
            <ul className={filterStyle}>
              <li><i className="fa-solid fa-filter" /> <span className='FilterButtons' onClick={filterCatClick}>by Category</span></li>
              <li><i className="fa-solid fa-filter" /> <span className='FilterButtons' onClick={filterAccClick}>by Account</span></li>
              <li><i className="fa-solid fa-filter" /> <span className='FilterButtons' onClick={filterDateClick}>by Date</span></li>
              <li><i className="fa-solid fa-filter" /> <span className='FilterButtons' onClick={searchClick}>by Payee</span></li>
            </ul>
          </li>
          <AnimatePresence
          key="search-payee-modal"
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
          >
            {isSearch && <TransactionSearch setIsSearch={setIsSearch} transactions={transactions}/>}
          </AnimatePresence>
        </ul>
      </div>
      <AnimatePresence
          key="filter-category-modal"
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
      >
        {isFilterCat && <TransactionFilter setIsFilterCat={setIsFilterCat} setIsFilterAcc={setIsFilterAcc} setIsFilterDate={setIsFilterDate} isFilterCat={isFilterCat} isFilterAcc={isFilterAcc} isFilterDate={isFilterDate}/>}
        {isFilterAcc && <TransactionFilter setIsFilterCat={setIsFilterCat} setIsFilterAcc={setIsFilterAcc} setIsFilterDate={setIsFilterDate} isFilterCat={isFilterCat} isFilterAcc={isFilterAcc} isFilterDate={isFilterDate}/>}
        {isFilterDate && <TransactionFilter setIsFilterCat={setIsFilterCat} setIsFilterAcc={setIsFilterAcc} setIsFilterDate={setIsFilterDate} isFilterCat={isFilterCat} isFilterAcc={isFilterAcc} isFilterDate={isFilterDate}/>}
      </AnimatePresence>
    </div>
    );
  };

  return (
    <div className='SidePanel' id='MaxSidePanel'>
      <span id={'SideMin'}>
          <button onClick={toggleMin}><i class="fa-solid fa-window-minimize" /></button>
      </span>
      <AccountList isMax={isMax} />
      <div className='Transactions'>
        <h3>Transactions</h3>
        <button className='NewTransactionButton' onClick={toggleAdd}>New Transaction</button>
        <AnimatePresence
          key="new-transaction-modal"
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
        >
          {isAdd && <TransactionAdd accounts={accounts} setIsAdd={setIsAdd} categories={categories} />}
        </AnimatePresence>
        <ul>
          <li><i className="fa-solid fa-money-bill-wave" /> <NavLink to="/transactions">All</NavLink></li>
          <li style={{cursor: 'pointer'}} onClick={filterShowClick}><i className="fa-solid fa-money-bill-wave" /> Filter
            <ul className={filterStyle}>
              <li><i className="fa-solid fa-filter" /> <span className='FilterButtons' onClick={filterCatClick}>by Category</span></li>
              <li><i className="fa-solid fa-filter" /> <span className='FilterButtons' onClick={filterAccClick}>by Account</span></li>
              <li><i className="fa-solid fa-filter" /> <span className='FilterButtons' onClick={filterDateClick}>by Date</span></li>
              <li><i className="fa-solid fa-filter" /> <span className='FilterButtons' onClick={searchClick}>by Payee</span></li>
            </ul>
          </li>
          <AnimatePresence
          key="search-payee-modal"
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
          >
            {isSearch && <TransactionSearch setIsSearch={setIsSearch} transactions={transactions}/>}
          </AnimatePresence>
        </ul>
      </div>
      <AnimatePresence
          key="filter-category-modal"
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
      >
        {isFilterCat && <TransactionFilter setIsFilterCat={setIsFilterCat} setIsFilterAcc={setIsFilterAcc} setIsFilterDate={setIsFilterDate} isFilterCat={isFilterCat} isFilterAcc={isFilterAcc} isFilterDate={isFilterDate}/>}
        {isFilterAcc && <TransactionFilter setIsFilterCat={setIsFilterCat} setIsFilterAcc={setIsFilterAcc} setIsFilterDate={setIsFilterDate} isFilterCat={isFilterCat} isFilterAcc={isFilterAcc} isFilterDate={isFilterDate}/>}
        {isFilterDate && <TransactionFilter setIsFilterCat={setIsFilterCat} setIsFilterAcc={setIsFilterAcc} setIsFilterDate={setIsFilterDate} isFilterCat={isFilterCat} isFilterAcc={isFilterAcc} isFilterDate={isFilterDate}/>}
      </AnimatePresence>
    </div>
  );
};

export default SidePanel;
