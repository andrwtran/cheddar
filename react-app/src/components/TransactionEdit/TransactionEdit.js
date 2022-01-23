import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTransaction } from '../../store/transaction';
import './TransactionEdit.css';

export default function TransactionEdit({ transaction, editId, setEditId }) {
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

    console.log(transaction.trans_amount)
    console.log(typeof(transaction.trans_amount))

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
      // setIsAdd(false);
  };

  return (
    <>
      {editId !== transaction.id &&
        <td>
          <button onClick={toggleEdit}>Edit</button>
        </td>
      }

      {editId === transaction.id &&
        <>
          <form id='Edit' type="hidden" className='TransactionEditForm' onSubmit={handleSubmit}></form>
          <td>
            <input
              form='Edit'
              type="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
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
            <input
              form='Edit'
              type="number"
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
              name="categoryId"
            />
          </td>
          <td>
            <input
              form='Edit'
              type="number"
              onChange={(e) => setAccountId(e.target.value)}
              value={accountId}
              name="accountId"
            />
          </td>
          <td><button className='submit-button' type="submit" form='Edit'>Save</button></td>
          <td><button className='cancel-button' onClick={reset}>Cancel</button></td>
        </>
      }
  </>
  );
};
