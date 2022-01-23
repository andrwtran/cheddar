import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../store/transaction";
import TransactionAdd from "../TransactionAdd/TransactionAdd";
import TransactionDelete from "../TransactionDelete/TransactionDelete";
import TransactionEdit from "../TransactionEdit/TransactionEdit";
import './TransactionList.css';

const TransactionList = () => {
  const dispatch = useDispatch()
  const transactions = useSelector((state) => state.transaction.all);

  const [editId, setEditId] = useState();

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
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              {editId !== transaction.id &&
                <>
                  <td>{transaction.trans_date}</td>
                  <td>{transaction.trans_payee}</td>
                  <td>${transaction.trans_amount}</td>
                  <td>{transaction.categoryId}</td>
                  <td>{transaction.accountId}</td>
                </>
              }
              <TransactionEdit transaction={transaction} editId={editId} setEditId={setEditId} />
              <td><TransactionDelete oldTransaction={transaction} /></td>
            </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
