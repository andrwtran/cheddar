import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTransaction } from '../../store/transaction';
import './TransactionAdd.css';

export default function AccountAdd() {
  const [date, setDate] = useState('');
  const [payee, setPayee] = useState('');
  const [amount, setAmount] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [accountId, setAccountId] = useState('');

  const dispatch = useDispatch();

  const reset = () => {
    setDate('');
    setPayee('');
    setAmount('');
    setCategoryId('');
    setAccountId('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTransaction = {
      trans_date: date,
      trans_payee: payee,
      trans_amount: amount,
      categoryId: categoryId,
      accountId: accountId
    };
    dispatch(createTransaction(newTransaction));
    reset();
  };

  return (
    <div className='TransactionAdd'>
      <form className='TransactionForm' onSubmit={handleSubmit}>
      <label htmlFor="date">Date</label>
      <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          name="date"
        />
        <label htmlFor="payee">Payee</label>
        <input
          type="text"
          onChange={(e) => setPayee(e.target.value)}
          value={payee}
          placeholder="Payee"
          name="payee"
        />
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          name="amount"
        />
        <label htmlFor="categoryId">Category</label>
        <input
          type="number"
          onChange={(e) => setCategoryId(e.target.value)}
          value={categoryId}
          name="categoryId"
        />
        <label htmlFor="accountId">Account</label>
        <input
          type="number"
          onChange={(e) => setAccountId(e.target.value)}
          value={accountId}
          name="accountId"
        />
        <button className='submit-button' type="submit">Save</button>
      </form>
    </div>
  );
}
