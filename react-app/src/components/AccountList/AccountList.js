import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts } from '../../store/account';
import AccountAdd from '../AccountAdd/AccountAdd';
import AccountDelete from '../AccountDelete/AccountDelete';
import AccountEdit from '../AccountEdit/AccountEdit';
import './AccountList.css';

export default function AccountList() {
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
  };

  return (
    <div className='AccountList'>
      <h3>Accounts</h3>
      <button onClick={toggleAdd}>Add</button>
      {isAdd && <AccountAdd setIsAdd={setIsAdd} accounts={accounts}/>}
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
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
