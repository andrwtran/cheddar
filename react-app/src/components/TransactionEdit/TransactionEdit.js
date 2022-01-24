import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTransaction } from '../../store/transaction';
import TransactionDelete from '../TransactionDelete/TransactionDelete';
import './TransactionEdit.css';

export default function TransactionEdit({ transaction, editId, setEditId, accounts, setIsAdd, categories }) {
  const [date, setDate] = useState(transaction.trans_date);
  const [payee, setPayee] = useState(transaction.trans_payee);
  const [amount, setAmount] = useState(transaction.trans_amount);
  const [categoryId, setCategoryId] = useState(transaction.categoryId);
  const [accountId, setAccountId] = useState(transaction.accountId);

  const dispatch = useDispatch();

  const reset = () => {
    setDate(transaction.trans_date);
    setPayee(transaction.trans_payee);
    setAmount(transaction.trans_amount);
    setCategoryId(transaction.categoryId);
    setAccountId(transaction.accountId);
    setEditId();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date) {
      return alert("You must enter a date for your transaction.")
    };

    const today = new Date();

    if (new Date(date) > today) {
      return alert("You must enter a date in the past for your transaction.")
    };

    if (!payee) {
      return alert("You must enter a payee for your transaction.")
    };

    if (!amount) {
      return alert("You must enter an amount for your transaction.")
    }

    const editTransaction = {
      id: transaction.id,
      trans_date: date,
      trans_payee: payee,
      trans_amount: amount,
      categoryId,
      accountId
    };
    dispatch(updateTransaction(editTransaction));
    reset();
  };

  const toggleEdit = (e) => {
    e.preventDefault();
      setEditId(transaction.id);
      setIsAdd(false);
  };

  return (
    <>
      {editId !== transaction.id &&
        <>
          <td>
            <div className='editButtons'>
              <button onClick={toggleEdit}><i className="fas fa-edit" /></button>
              <TransactionDelete oldTransaction={transaction} />
            </div>
          </td>
        </>

      }

      {editId === transaction.id &&
        <>
          <form id='Edit' type="hidden" className='TransactionEditForm' onSubmit={handleSubmit}></form>
          <td>
            <input
              form='Edit'
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={new Date(date).toISOString().substring(0,10)}
              name="date"
              />
          </td>
          <td>
            <input
              form='Edit'
              type="text"
              onChange={(e) => setPayee(e.target.value)}
              value={payee}
              placeholder="Payee"
              name="payee"
            />
          </td>
          <td>
            <input
              form='Edit'
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              name="amount"
            />
          </td>
          <td>
            <select
              form='Edit'
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
              name="categoryId"
            >
              {Object.values(categories).slice(1).map((category) => (
                <option value={category.id}>{category.category_name}</option>
                )
              )}
            </select>
          </td>
          <td colSpan={2}>
            <select
              form='Edit'
              onChange={(e) => setAccountId(e.target.value)}
              value={accountId}
              name="accountId"
            >
              {Object.values(accounts).map((account) => (
                <option value={account.id}>{account.account_name}</option>
                )
              )}
            </select>
          </td>
          <td colSpan={0.5}>
            <div className='saveButtons'>
              <button className='submit-button' type="submit" form='Edit'><i className="fas fa-save" /></button>
              <button className='cancel-button' onClick={reset}><i className="far fa-window-close" /></button>
            </div>
          </td>
        </>
      }
  </>
  );
};
