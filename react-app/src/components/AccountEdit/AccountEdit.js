import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateAccount } from '../../store/account';
import './AccountEdit.css';

export default function AccountEdit({ setEditId, editId, account, accounts, setIsAdd }) {
  const [name, setName] = useState(account.account_name);
  const dispatch = useDispatch();

  const reset = () => {
    setName(account.account_name);
    setEditId();
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
    reset();
  };

    const toggleEdit = (e) => {
    e.preventDefault();
      setEditId(account.id);
      setIsAdd(false);
  };

  return (
    <div className='AccountEdit'>
      {editId !== account.id && <button onClick={toggleEdit}><i className="fas fa-edit" /></button>}

      {editId === account.id &&
        <form className='AccountEditForm' onSubmit={handleSubmit}>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder={name}
            name="name"
          />
          {name && <button className='submit-button' type="submit"><i className="fas fa-save" /></button>}
          {!name && <button className='submit-button' type="submit" disabled="disabled"><i className="fas fa-save" /></button>}
          <button className='cancel-button' onClick={reset}><i className="far fa-window-close" /></button>
        </form>
      }
  </div>
  );
}
