import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAccount } from '../../store/account';
import './AccountEdit.css';

export default function AccountEdit({ setIsEdit, account }) {
  const [name, setName] = useState(account.account_name);
  const dispatch = useDispatch();

  const reset = () => {
    setName('');
    setIsEdit(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TO-DO: Add error handling for no name and duplicate names

    const editAccount = {
      id: account.id,
      account_name: name
    };
    dispatch(updateAccount(editAccount));
    reset();
  };

  return (
    <div className='AccountEdit'>
    <form className='AccountEditForm' onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        placeholder={name}
        name="name"
      />
      <button className='submit-button' type="submit">Save</button>
    </form>
  </div>
  );
}
