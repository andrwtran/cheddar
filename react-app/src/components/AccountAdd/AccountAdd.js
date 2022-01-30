import React from 'react';
import  ReactDOM  from 'react-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAccount } from '../../store/account';
import './AccountAdd.css';

export default function AccountAdd({ setIsAdd, accounts }) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const reset = () => {
    setName('');
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

  return ReactDOM.createPortal(
    <>
      <div className="AccountFormOverlay" onClick={reset}></div>
      <div className='AccountAdd'>
        <form className='AccountAddForm' onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="New Account"
            name="name"
          />
          {name && <button className='submit-button' type="submit">Save</button>}
          {!name && <button className='submit-button' type="submit" disabled="disabled">Save</button>}
          <button onClick={reset}>Close</button>
        </form>
      </div>
    </>,
  document.getElementById('root'));
}
