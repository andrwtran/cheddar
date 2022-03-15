import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import  ReactDOM  from 'react-dom';
import Backdrop from "../Backdrop/Backdrop";
import { motion } from "framer-motion";
import "react-datepicker/dist/react-datepicker.css";
import "./TransactionFilter.css";

export default function TransactionFilter({ isFilterDate, isFilterCat, isFilterAcc, setIsFilterDate, setIsFilterCat, setIsFilterAcc }) {
  const history = useHistory();

  const accounts = useSelector((state) => state.account.byId);
  const categories = useSelector((state) => state.category);

  const [categoryId, setCategoryId] = useState(2);
  const [accountId, setAccountId] = useState(1);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  const reset = () => {
    setIsFilterCat(false);
    setIsFilterAcc(false);
    setIsFilterDate(false);
  }

  const filterCatClick = (e) => {
    e.preventDefault();
    reset();
    console.log("CATEGORY PUSH")
    history.push(`/transactions/category/${categoryId}`)
  };

  const filterAccClick = (e) => {
    e.preventDefault();
    reset();
    console.log("ACCOUNT PUSH")
    history.push(`/transactions/account/${accountId}`)
  };

  const filterDateClick = () => {
    reset();
    if (endDate) {
      const firstDateString = `${startDate.getFullYear()}${("0" + (startDate.getMonth() + 1).toString()).slice(-2)}${startDate.getDate()}`;
      const secondDateString = `${endDate.getFullYear()}${("0" + (endDate.getMonth() + 1).toString()).slice(-2)}${endDate.getDate()}`;
      history.push(`/transactions/date/${firstDateString + '&' + secondDateString}`);
    } else {
      const firstDateString = `${startDate.getFullYear()}${("0" + (startDate.getMonth() + 1).toString()).slice(-2)}${startDate.getDate()}`;
      history.push(`/transactions/date/${firstDateString}`);
    };
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      y: "100vh",
      opacity: 0
    }
  };

  if (isFilterCat) {
    return ReactDOM.createPortal(
      <Backdrop onClick={reset}>
        {/* <div className="TransactionFilterOverlay" onClick={reset}></div> */}
        <motion.div
          key="Category-Filter"
          className='TransactionFilter'
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          <form>
            <h3><i className="fa-solid fa-money-bill-wave" /> Transactions</h3>
            <label>by Category</label>
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
              name="categoryId"
              id="CategoryFilter"
            >
              {Object.values(categories).slice(1).map((category) => (
                <option value={category.id}>{category.category_name}</option>
                )
              )}
            </select>
            <span className="TransactionFilterButtons">
              <button onClick={(e) => filterCatClick(e)}>Filter</button>
              <button type="reset" onClick={reset}>Close</button>
            </span>
          </form>
        </motion.div>
      </Backdrop>,
    document.getElementById('root'))
  };

  if (isFilterAcc) {
    return ReactDOM.createPortal(
      <Backdrop onClick={reset}>
        {/* <div className="TransactionFilterOverlay" onClick={reset}></div> */}
        <motion.div
        key="Account-Filter"
        className='TransactionFilter'
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        >
          <form>
            <h3><i className="fa-solid fa-money-bill-wave" /> Transactions</h3>
            <label>by Account</label>
            <select
                onChange={(e) => setAccountId(e.target.value)}
                value={accountId}
                name="accountId"
                id="AccountFilter"
              >
                {Object.values(accounts).map((account) => (
                  <option value={account.id}>{account.account_name}</option>
                  )
                )}
            </select>
            <span className="TransactionFilterButtons">
              <button onClick={(e) => filterAccClick(e)}>Filter</button>
              <button type="reset" onClick={reset}>Close</button>
            </span>
          </form>
        </motion.div>
      </Backdrop>,
    document.getElementById('root'))
  };

  if (isFilterDate) {
    return ReactDOM.createPortal(
      <Backdrop onClick={reset}>
        {/* <div className="TransactionFilterOverlay" onClick={reset}></div> */}
        <motion.div
        className='TransactionFilter'
        id='TransactionFilterDate'
        key="Date-Filter"
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        >
          <div>
            <h3><i className="fa-solid fa-money-bill-wave" /> Transactions</h3>
            <span className="TransactionFilterText">by Date</span>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              maxDate={new Date()}
              selectsRange
              inline
            />
            <span className="TransactionFilterButtons">
              <button onClick={filterDateClick}>Filter</button>
              <button onClick={reset}>Close</button>
            </span>
          </div>
        </motion.div>
      </Backdrop>,
    document.getElementById('root'))
  };

  return null
};
