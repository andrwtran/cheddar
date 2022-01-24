import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../store/transaction";
import { getAccounts } from "../../store/account";
import TransactionAdd from "../TransactionAdd/TransactionAdd";
import TransactionEdit from "../TransactionEdit/TransactionEdit";
import './TransactionList.css';

const TransactionList = () => {
  const dispatch = useDispatch()
  const transactions = useSelector((state) => state.transaction.all);
  const accounts = useSelector((state) => state.account.byId);

  const [isAdd, setIsAdd] = useState(false);
  const [editId, setEditId] = useState();

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getAccounts());
  }, [dispatch]);

  const toggleAdd = (e) => {
    e.preventDefault();
    setIsAdd(!isAdd);
  };

  return (
    <div className="TransactionList">
      <h3>All Transactions</h3>
      <button onClick={toggleAdd}>Add</button>
      {isAdd && <TransactionAdd accounts={accounts} setIsAdd={setIsAdd} />}
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
                  <td>${transaction.trans_amount.toFixed(2)}</td>
                  <td>{transaction.categoryId}</td>
                  <td>{accounts[transaction.accountId].account_name}</td>
                </>
              }
              <TransactionEdit
              transaction={transaction}
              editId={editId}
              setEditId={setEditId}
              accounts={accounts}
              setIsAdd={setIsAdd}
              />
            </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
