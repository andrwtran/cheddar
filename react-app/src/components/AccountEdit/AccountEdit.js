import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAccount } from '../../store/account';
import './AccountEdit.css';

export default function AccountEdit({ setEditId, editId, account }) {
  const [name, setName] = useState(account.account_name);
  const dispatch = useDispatch();

  const reset = () => {
    setName(account.account_name);
    setEditId();
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

    const toggleEdit = (e) => {
    e.preventDefault();
      setEditId(account.id)
  };

  return (
    <div className='AccountEdit'>
      {editId !== account.id && <button onClick={toggleEdit}>Edit</button>}

      {editId === account.id &&
        <form className='AccountEditForm' onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder={name}
            name="name"
          />
          <button className='submit-button' type="submit">Save</button>
          <button className='cancel-button' onClick={reset}>Cancel</button>
        </form>
      }
  </div>
  );
}
