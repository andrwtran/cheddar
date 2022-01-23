import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../store/transaction";
import TransactionAdd from "../TransactionAdd/TransactionAdd";
import './TransactionList.css';

const TransactionList = () => {
  const dispatch = useDispatch()
  const transactions = useSelector((state) => state.transaction.all);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <div className="TransactionList">
      <h3>All Transactions</h3>
      <TransactionAdd />
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Payee</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Account</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.trans_date}</td>
              <td>{transaction.trans_payee}</td>
              <td>${transaction.trans_amount}</td>
              <td>{transaction.categoryId}</td>
              <td>{transaction.accountId}</td>
            </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
