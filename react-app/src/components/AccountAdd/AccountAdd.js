import React from 'react';
import  ReactDOM  from 'react-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAccount } from '../../store/account';
import Backdrop from '../Backdrop/Backdrop';
import { motion } from 'framer-motion';
import './AccountAdd.css';

export default function AccountAdd({ setIsAdd, accounts }) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const reset = () => {
    // setName('');
    setIsAdd(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (accounts.find((account) => account.account_name === name)) {
      return alert("You cannot have two accounts with the same name.");
    };

    const newAccount = {
      account_name: name
    };
    dispatch(createAccount(newAccount));
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
    <Backdrop onClick={reset}>
      {/* <motion.div
        key="Account-Form-Overlay"
        className="AccountFormOverlay"
        onClick={(reset)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
      </motion.div> */}
      <motion.div
        key="Account-Add"
        className='AccountAdd'
        variants={dropIn}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <form className='AccountAddForm' onSubmit={handleSubmit}>
          <h3><i className="fa-solid fa-cheese" /> New Account</h3>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="Account Name"
            name="name"
            autoFocus
          />
          {name && <button className='submit-button-active' type="submit">Save</button>}
          {!name && <button className='submit-button-disabled' type="submit" disabled="disabled">Save</button>}
          <button className='submit-button-active' type="reset" onClick={reset}>Close</button>
        </form>
      </motion.div>
    </Backdrop>,
  document.getElementById('root'));
}
