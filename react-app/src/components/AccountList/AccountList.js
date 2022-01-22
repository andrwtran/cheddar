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
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const toggleAdd = (e) => {
    e.preventDefault();
    setIsAdd(!isAdd);
  };

  const toggleEdit = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);

    // TO-DO: clean up edit feature
  };

  return (
    <div className='AccountList'>
      <h3>Accounts</h3>
      <button onClick={toggleAdd}>Add</button>
      {isAdd && <AccountAdd setIsAdd={setIsAdd} />}
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            { account.account_name }
            <button onClick={toggleEdit}>Edit</button>
            {isEdit && <AccountEdit setIsEdit={setIsEdit} account={account} />}
            <AccountDelete oldAccount={account} />
          </li>
        )
        )}
      </ul>
    </div>
  );

};
