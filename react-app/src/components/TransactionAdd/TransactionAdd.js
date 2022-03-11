import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTransaction } from '../../store/transaction';
import  ReactDOM  from 'react-dom';
import { motion } from 'framer-motion';
import './TransactionAdd.css';

export default function AccountAdd({ accounts, setIsAdd, categories }) {
  const [date, setDate] = useState('');
  const [payee, setPayee] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [accountId, setAccountId] = useState('');

  const dispatch = useDispatch();

  const reset = () => {
    // setDate('');
    // setPayee('');
    // setAmount('');
    // setCategoryId('');
    // setAccountId('');
    setIsAdd(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date) {
      return alert("You must enter a date for your transaction.")
    };

    const today = new Date();

    if (new Date(date) > today) {
      return alert("You must enter a date in the past for your transaction.")
    };

    if (!payee) {
      return alert("You must enter a payee for your transaction.")
    };

    if (!amount) {
      return alert("You must enter an amount for your transaction.")
    }

    const newTransaction = {
      trans_date: date,
      trans_payee: payee,
      trans_amount: amount,
      categoryId: categoryId,
      accountId: accountId
    };
    dispatch(createTransaction(newTransaction));
    reset();
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

  return ReactDOM.createPortal(
    <>
      <motion.div
        key="Transaction-Form-Overlay"
        className="TransactionFormOverlay"
        onClick={reset}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
      </motion.div>
      <motion.div
        key="Transaction-Form"
        className='TransactionForm'
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <form className='TransactionForm' onSubmit={handleSubmit}>
          <h3><i className="fa-solid fa-money-bill-wave" /> New Transaction</h3>
          <div>
            <label htmlFor="date"> Date</label>
            <input
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              name="date"
            />
          </div>
          <div>
            <label htmlFor="payee"> Payee</label>
            <input
              type="text"
              onChange={(e) => setPayee(e.target.value)}
              value={payee}
              name="payee"
            />
          </div>
          <div>
            <label htmlFor="amount"> Amount</label>
            <input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              name="amount"
            />
          </div>
          <div>
            <label htmlFor="categoryId"> Category</label>
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
              name="categoryId"
            >
              <option value="" selected disabled hidden></option>
              {Object.values(categories).slice(1).map((category) => (
                <option value={category.id}>{category.category_name}</option>
                )
              )}
            </select>
          </div>
          <div>
            <label htmlFor="accountId"> Account</label>
            <select
              onChange={(e) => setAccountId(e.target.value)}
              value={accountId}
              name="accountId"
            >
              <option value="" selected disabled hidden></option>
              {Object.values(accounts).map((account) => (
                <option value={account.id}>{account.account_name}</option>
                )
              )}
            </select>
          </div>
          <div className='TransactionFormButtons'>
            <span>
              <button className='submit-button' type="submit">Save</button>
            </span>
            <span>
              <button className='close-button' type="reset" onClick={() => setIsAdd(false)}>Close</button>
            </span>
          </div>
        </form>
      </motion.div>
    </>,
  document.getElementById('root'));
}
