import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTransaction } from '../../store/transaction';
import './TransactionAdd.css';

export default function AccountAdd({ accounts, setIsAdd, categories }) {
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
    setIsAdd(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!date) {
      return alert("You must enter a date for your transaction.")
    };

    if (!payee) {
      return alert("You must enter a payee for your transaction.")
    };

    if (!amount) {
      return alert("You must enter an amount for your transaction.")
    }

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

        <select
          onChange={(e) => setCategoryId(e.target.value)}
          value={categoryId}
          name="categoryId"
        >
          {Object.values(categories).slice(1).map((category) => (
            <option value={category.id}>{category.category_name}</option>
            )
          )}
        </select>
        <label htmlFor="accountId">Account</label>
        <select
          onChange={(e) => setAccountId(e.target.value)}
          value={accountId}
          name="accountId"
        >
          {Object.values(accounts).map((account) => (
            <option value={account.id}>{account.account_name}</option>
            )
          )}
        </select>
        <button className='submit-button' type="submit">Save</button>
      </form>
    </div>
  );
}
