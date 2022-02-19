import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../store/transaction";
import { getAccounts } from "../../store/account";
import { getCategories } from "../../store/category";
import { currencyFormatter, dateConverter, tableSorter } from "../../utils";
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

  const { categoryId, accountId, dateQuery } = useParams();

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getAccounts());
    dispatch(getCategories());
    addSort();
  }, [dispatch]);

  const toggleAdd = (e) => {
    e.preventDefault();
    setIsAdd(!isAdd);
  };

  const addSort = () => {
    document.querySelectorAll("th").forEach(header => {
      header.addEventListener("click", () => {
        const table = header.parentElement.parentElement.parentElement;
        const index = Array.prototype.indexOf.call(header.parentElement.children, header);
        const asc = header.classList.contains("th-sort-asc");

        tableSorter(table, index, !asc);
      })
    })
  };

  if (categoryId) {
    const transactions_category = transactions.filter(transaction => transaction.categoryId === +categoryId );
    return (
      <div className="TransactionList">
        <h2>{categories[parseInt(categoryId)-1]?.category_name} Transactions</h2>
        <div className="TransactionAdd">
          <button onClick={toggleAdd}>New Transaction</button>
          {isAdd && <TransactionAdd accounts={accounts} setIsAdd={setIsAdd} categories={categories} />}
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
              <th className="TableButtons"></th>
            </tr>
          </thead>
          <tbody>
            {transactions_category.map((transaction) => (
              <tr key={transaction.id}>
                {editId !== transaction.id &&
                  <>
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

  if (accountId) {
    const transactions_category = transactions.filter(transaction => transaction.accountId === +accountId );
    return (
      <div className="TransactionList">
        <h2>{accounts[parseInt(accountId)]?.account_name} Transactions</h2>
        <div className="TransactionAdd">
          <button onClick={toggleAdd}>New Transaction</button>
          {isAdd && <TransactionAdd accounts={accounts} setIsAdd={setIsAdd} categories={categories} />}
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
              <th className="TableButtons"></th>
            </tr>
          </thead>
          <tbody>
            {transactions_category.map((transaction) => (
              <tr key={transaction.id}>
                {editId !== transaction.id &&
                  <>
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

  if (dateQuery) {
    const firstDateYear = parseInt(dateQuery.split('x')[0].slice(0,4));
    const firstDateMonth = parseInt(dateQuery.split('x')[0].slice(4,6));
    const firstDateDay = parseInt(dateQuery.split('x')[0].slice(6));
    const secondDateYear = parseInt(dateQuery.split('x')[1].slice(0,4));
    const secondDateMonth = parseInt(dateQuery.split('x')[1].slice(4,6));
    const secondDateDay = parseInt(dateQuery.split('x')[1].slice(6));

    const firstDate = new Date(firstDateYear,firstDateMonth-1,firstDateDay);
    const secondDate = new Date(secondDateYear,secondDateMonth-1,secondDateDay);

    const transactions_date = transactions.filter(transaction => (new Date(transaction.trans_date) >= firstDate && new Date(transaction.trans_date) <= secondDate));

    return (
      <div className="TransactionList">
        <h2>Date Transactions</h2>
        <div className="TransactionAdd">
          <button onClick={toggleAdd}>New Transaction</button>
          {isAdd && <TransactionAdd accounts={accounts} setIsAdd={setIsAdd} categories={categories} />}
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
              <th className="TableButtons"></th>
            </tr>
          </thead>
          <tbody>
            {transactions_date.map((transaction) => (
              <tr key={transaction.id}>
                {editId !== transaction.id &&
                  <>
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
  }

  return (
    <div className="TransactionList">
      <h2>All Transactions</h2>
      <div className="TransactionAdd">
        <button onClick={toggleAdd}>New Transaction</button>
        {isAdd && <TransactionAdd accounts={accounts} setIsAdd={setIsAdd} categories={categories} />}
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
            <th className="TableButtons"></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              {editId !== transaction.id &&
                <>
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

export default TransactionList;
