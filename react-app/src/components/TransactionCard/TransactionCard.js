import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../store/transaction";
import { getAccounts } from "../../store/account";
import { getCategories } from "../../store/category";
import "./TransactionCard.css"

export default function TransactionCard() {
  const dispatch = useDispatch()
  const transactions = useSelector((state) => state.transaction.all);

  const today = new Date();
  const transactions_monthly = transactions.filter(transaction => new Date(transaction.trans_date).getMonth() === today.getMonth());
  const accounts = useSelector((state) => state.account.byId);
  const categories = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getAccounts());
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className='TransactionCard'>
      <h3>Recent Transactions</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Payee</th>
            <th>Amount</th>
            <th>Category</th>
            <th colSpan={2}>Account</th>
          </tr>
        </thead>
        <tbody>
          {transactions_monthly.slice(0,20).map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.trans_date.slice(5,16)}</td>
              <td>{transaction.trans_payee}</td>
              <td>${transaction.trans_amount.toFixed(2)}</td>
              <td>{categories[transaction.categoryId - 1]?.category_name}</td>
              <td colSpan={2}>{accounts[transaction.accountId]?.account_name}</td>
            </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};
