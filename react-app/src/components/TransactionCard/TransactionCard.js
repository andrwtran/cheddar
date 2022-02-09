import React from 'react';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../store/transaction";
import { getAccounts } from "../../store/account";
import { getCategories } from "../../store/category";
import { currencyFormatter, dateConverter } from '../../utils';
import TransactionAdd from "../TransactionAdd/TransactionAdd";
import TransactionEdit from "../TransactionEdit/TransactionEdit";
import "./TransactionCard.css"

export default function TransactionCard() {
  const dispatch = useDispatch()
  const transactions = useSelector((state) => state.transaction.all);
  const accounts = useSelector((state) => state.account.byId);
  const categories = useSelector((state) => state.category);

  const num_accounts = Object.keys(accounts).length;

  const today = new Date();
  // const transactions_monthly = transactions.filter(transaction => new Date(transaction.trans_date).getMonth() === today.getMonth());
  const transactions_monthly = transactions.filter(transaction => parseInt(transaction.trans_date.slice(5,7)) === today.getMonth()+1);

  const [isAdd, setIsAdd] = useState(false);
  const [editId, setEditId] = useState();

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getAccounts());
    dispatch(getCategories());
  }, [dispatch, isAdd, num_accounts]);

  const toggleAdd = (e) => {
    e.preventDefault();
    setIsAdd(!isAdd);
  };

  return (
    <div className='TransactionCard'>
      <h3>Recent Transactions</h3>
      <div className="TransactionAdd">
          <button onClick={toggleAdd}>New Transaction</button>
          {isAdd && <TransactionAdd accounts={accounts} setIsAdd={setIsAdd} categories={categories} transactions_monthly={transactions_monthly} />}
        </div>
      <table>
        <col className='TableDate'></col>
        <col className='TablePayee'></col>
        <col className='TableAmount'></col>
        <col className='TableCategory'></col>
        <col className='TableAccount'></col>
        <col className='TableButtons'></col>
        <thead>
          <tr>
            <th>Date</th>
            <th>Payee</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Account</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions_monthly.slice(0,10).map((transaction) => (
            <tr key={transaction.id}>
              {editId !== transaction.id &&
                <>
                  {/* <td>{transaction.trans_date.slice(5,16)}</td> */}
                  <td>{dateConverter(transaction.trans_date)}</td>
                  <td>{transaction.trans_payee}</td>
                  <td>{currencyFormatter.format(transaction.trans_amount)}</td>
                  <td>{categories[transaction.categoryId - 1]?.category_name}</td>
                  <td>{accounts[transaction.accountId]?.account_name}</td>
                </>
              }
              <TransactionEdit
              transaction={transaction}
              editId={editId}
              setEditId={setEditId}
              accounts={accounts}
              setIsAdd={setIsAdd}
              categories={categories}
              />
            </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
