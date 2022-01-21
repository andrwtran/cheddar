import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAccounts } from '../../store/account';
import AccountAdd from '../AccountAdd/AccountAdd';
import './AccountList.css';

export default function AccountList() {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.account.all);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(getAccounts());
  }, [dispatch]);

  const toggleEdit = (e) => {
    e.preventDefault();
    setIsEdit(!isEdit);
  };

  return (
    <div className='AccountList'>
      <h3>Accounts</h3>
      <button onClick={toggleEdit}>Add</button>
      {isEdit && <AccountAdd />}
      <ul>
        {accounts.map(({ id, account_name }) => (
          <li key={id}>
            { account_name }
          </li>
        )
        )}
      </ul>
    </div>
  );

};
