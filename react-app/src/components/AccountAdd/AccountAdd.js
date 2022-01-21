import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAccount } from '../../store/account';
import './AccountAdd.css';

export default function AccountAdd() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const reset = () => {
    setName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TO-DO: Add error handling for no name and duplicate names

    const newAccount = {
      account_name: name
    };
    dispatch(createAccount(newAccount));
    reset();
  };

  return (
    <div className='AccountAdd'>
      <form className='AccountAddForm' onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="New Account"
          name="name"
        />
        <button className='submit-button' type="submit">Save</button>
      </form>
    </div>
  );
}
