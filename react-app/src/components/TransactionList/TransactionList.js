import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../store/transaction";
import './TransactionList.css';

const TransactionList = () => {
  const dispatch = useDispatch()
  const transactions = useSelector((state) => state.transaction.all);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <div className="TransactionList">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Payee</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr>
              <td>{transaction.trans_date}</td>
              <td>{transaction.trans_payee}</td>
              <td>${transaction.trans_amount}</td>
              <td>{transaction.categoryId}</td>
            </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
