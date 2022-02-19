import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts } from '../../store/account';
import AccountAdd from '../AccountAdd/AccountAdd';
import AccountDelete from '../AccountDelete/AccountDelete';
import AccountEdit from '../AccountEdit/AccountEdit';
import './AccountList.css';

export default function AccountList({ isMax }) {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.account.all);

  const [isAdd, setIsAdd] = useState(false);
  const [editId, setEditId] = useState();

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const toggleAdd = (e) => {
    e.preventDefault();
    setIsAdd(!isAdd);
    setEditId();
  };

  if (!isMax) {
    return (
      <div className='AccountList'>
      <h3>Accounts</h3>
      <button className='NewAccountButton' onClick={toggleAdd}><i className="fas fa-plus-square" /> Add</button>
      {isAdd && <AccountAdd setIsAdd={setIsAdd} accounts={accounts}/>}
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            {editId !== account.id && <i className="fas fa-cheese" />}
            {editId !== account.id && account.account_name}
          </li>
        )
        )}
      </ul>
    </div>
    );
  };

  return (
    <div className='AccountList'>
      <h3>Accounts</h3>
      <button className='NewAccountButton' onClick={toggleAdd}>New Account</button>
      {isAdd && <AccountAdd setIsAdd={setIsAdd} accounts={accounts}/>}
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            {editId !== account.id && <i className="fas fa-cheese" />}
            {editId !== account.id && account.account_name}
            <AccountEdit
            setEditId={setEditId}
            editId={editId}
            account={account}
            accounts={accounts}
            setIsAdd={setIsAdd}
            />
            {editId !== account.id && <AccountDelete oldAccount={account} />}
          </li>
        )
        )}
      </ul>
    </div>
  );

};
