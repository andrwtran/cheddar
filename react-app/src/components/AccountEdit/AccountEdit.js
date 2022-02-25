import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAccount } from '../../store/account';
import './AccountEdit.css';

export default function AccountEdit({ setEditId, editId, account, accounts, setIsAdd }) {
  const [name, setName] = useState(account.account_name);
  const dispatch = useDispatch();

  const reset = () => {
    setEditId();
    setName(account.account_name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (accounts.find((account) => account.account_name === name)) {
      return alert("You cannot have two accounts with the same name.");
    };

    const editAccount = {
      id: account.id,
      account_name: name
    };
    dispatch(updateAccount(editAccount));
    setEditId();
  };

    const toggleEdit = (e) => {
    e.preventDefault();
      setEditId(account.id);
      setIsAdd(false);
  };

  return (
    <div className='AccountEdit'>
      {editId !== account.id && <button className="AccountEditButton" onClick={toggleEdit}><i class="fa-solid fa-pen-to-square" /></button>}

      {editId === account.id &&
        <form className='AccountEditForm' onSubmit={handleSubmit}>
          <span id="AccountEditInput">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              name="name"
            />
          </span>
          <span id="AccountEditButtons">
            {name && <button className='submit-button-active' type="submit"><i class="fa-solid fa-floppy-disk" /></button>}
            {!name && <button className='submit-button-disabled' type="submit" disabled="disabled"><i class="fa-solid fa-floppy-disk" /></button>}
            <button className='cancel-button' onClick={reset}><i class="fa-solid fa-square-xmark" /></button>
          </span>
        </form>
      }
  </div>
  );
}
