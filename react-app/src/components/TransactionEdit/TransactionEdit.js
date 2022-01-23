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

    const editTransaction = {
      id: transaction.id,
      trans_date: transaction.trans_date,
      trans_payee: transaction.trans_payee,
      trans_amount: transaction.trans_amount,
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
    <div className='TransactionEdit'>
      {editId !== transaction.id &&
        <td>
          <button onClick={toggleEdit}>Edit</button>
        </td>
      }

      {editId === transaction.id &&
        <form className='TransactionEditForm' onSubmit={handleSubmit}>
          <td>
            <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                value={date}
                name="date"
              />
          </td>
          <td>
            <input
              type="text"
              onChange={(e) => setPayee(e.target.value)}
              value={payee}
              placeholder="Payee"
              name="payee"
            />
          </td>
          <td>
            <input
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              name="amount"
            />
          </td>
          <td>
            <input
              type="number"
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
              name="categoryId"
            />
          </td>
          <td>
            <input
              type="number"
              onChange={(e) => setAccountId(e.target.value)}
              value={accountId}
              name="accountId"
            />
          </td>
          <td><button className='submit-button' type="submit">Save</button></td>
          <td><button className='cancel-button' onClick={reset}>Cancel</button></td>
        </form>
      }
  </div>
  );
};
