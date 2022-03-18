import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import AccountList from '../AccountList/AccountList';
import TransactionFilter from '../TransactionFilter/TransactionFilter';
import TransactionAdd from '../TransactionAdd/TransactionAdd';
import { getBudgets } from '../../store/budget/budget';
import { getTransactions } from '../../store/transaction/transaction';
import { getCategories } from '../../store/category/category';
import { getAccounts } from '../../store/account/account';
import { AnimatePresence } from 'framer-motion';
import "./SidePanel.css";

const SidePanel = () => {
  const dispatch = useDispatch()

  const [isMax, setIsMax] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [filterStyle, setFilterStyle] = useState("hide");

  const [filterType, setFilterType] = useState();
  const [isFilter, setIsFilter] = useState(false);

  useEffect(() => {
    dispatch(getAccounts())
    dispatch(getTransactions());
    dispatch(getBudgets());
    dispatch(getCategories());
  }, [dispatch]);

  const accounts = useSelector((state) => state.account.all);
  const categories = useSelector((state) => state.category);

  const toggleMax = (e) => {
    e.stopPropagation();
    setIsMax(!isMax);
  };

  const toggleAdd = (e) => {
    e.stopPropagation();
    if (!accounts.length) return alert("You must create an account before creating any transactions.")
    setIsAdd(!isAdd);
  };

  const filterCatClick = (e) => {
    e.stopPropagation();
    setIsFilter(true);
    setFilterType("category");
  };

  const filterAccClick = (e) => {
    e.stopPropagation();
    setIsFilter(true);
    setFilterType("account");
  };

  const filterDateClick = (e) => {
    e.stopPropagation();
    setIsFilter(true);
    setFilterType("date");
  };

  const filterPayeeClick = (e) => {
    e.stopPropagation();
    setIsFilter(true);
    setFilterType("payee");
  }

  const filterShowClick = (e) => {
    e.stopPropagation();
    filterStyle === "hide" ? setFilterStyle("") : setFilterStyle("hide")
  }

  return (
    <div className='SidePanel' id={isMax ? 'MaxSidePanel' : 'MinSidePanel'}>
      <span id={'SideMax'}>
          <button onClick={toggleMax}><i class={isMax ? "fa-solid fa-window-minimize" : "fa-solid fa-window-maximize"} /></button>
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
              <li><i className="fa-solid fa-filter" /> <span className='FilterButtons' onClick={filterPayeeClick}>by Payee</span></li>
            </ul>
          </li>
        </ul>
      </div>
      <AnimatePresence
          key="filter-modal"
          initial={false}
          exitBeforeEnter={true}
          onExitComplete={() => null}
      >
        {isFilter && <TransactionFilter
          filterType={filterType}
          setIsFilter={setIsFilter}
          categories={categories}
          accounts={accounts}
        />}
      </AnimatePresence>
    </div>
  );
};

export default SidePanel;
