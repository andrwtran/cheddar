import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../store/transaction";
import { getAccounts } from "../../store/account";
import { getCategories } from "../../store/category";
import TransactionAdd from "../TransactionAdd/TransactionAdd";
import TransactionEdit from "../TransactionEdit/TransactionEdit";
import './TransactionList.css';

const TransactionList = () => {
  const dispatch = useDispatch()
  const transactions = useSelector((state) => state.transaction.all);
  const accounts = useSelector((state) => state.account.byId);
  const categories = useSelector((state) => state.category);

  const [isAdd, setIsAdd] = useState(false);
  const [editId, setEditId] = useState();

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getAccounts());
    dispatch(getCategories());
  }, [dispatch]);

  const toggleAdd = (e) => {
    e.preventDefault();
    setIsAdd(!isAdd);
  };

  return (
    <div className="TransactionList">
      <h2>All Transactions</h2>
      <div className="TransactionAdd">
        <button onClick={toggleAdd}>New Transaction</button>
        {isAdd && <TransactionAdd accounts={accounts} setIsAdd={setIsAdd} categories={categories} />}
      </div>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Payee</th>
            <th>Amount</th>
            <th>Category</th>
            <th colSpan={2}>Account</th>
            <th className="TableButtons"></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              {editId !== transaction.id &&
                <>
                  <td>{transaction.trans_date.slice(5,16)}</td>
                  <td>{transaction.trans_payee}</td>
                  <td>${transaction.trans_amount.toFixed(2)}</td>
                  <td>{categories[transaction.categoryId - 1]?.category_name}</td>
                  <td colSpan={2}>{accounts[transaction.accountId]?.account_name}</td>
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

export default TransactionList;
