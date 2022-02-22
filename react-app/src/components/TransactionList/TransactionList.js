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
    let firstDateYear;
    let firstDateMonth;
    let firstDateDay;
    let secondDateYear;
    let secondDateMonth;
    let secondDateDay;
    let transactions_date;
    let firstDate
    let secondDate

    if (dateQuery.indexOf("&") === -1) {
      firstDateYear = parseInt(dateQuery.slice(0,4));
      firstDateMonth = parseInt(dateQuery.slice(4,6));
      firstDateDay = parseInt(dateQuery.slice(6));

      firstDate = new Date(Date.UTC(firstDateYear,firstDateMonth-1,firstDateDay));

      transactions_date = transactions.filter(transaction => (new Date(transaction.trans_date).getTime() === firstDate.getTime()));
    } else {
      firstDateYear = parseInt(dateQuery.split('&')[0].slice(0,4));
      firstDateMonth = parseInt(dateQuery.split('&')[0].slice(4,6));
      firstDateDay = parseInt(dateQuery.split('&')[0].slice(6));
      secondDateYear = parseInt(dateQuery.split('&')[1].slice(0,4));
      secondDateMonth = parseInt(dateQuery.split('&')[1].slice(4,6));
      secondDateDay = parseInt(dateQuery.split('&')[1].slice(6));

      firstDate = new Date(Date.UTC(firstDateYear,firstDateMonth-1,firstDateDay));
      secondDate = new Date(Date.UTC(secondDateYear,secondDateMonth-1,secondDateDay));

      transactions_date = transactions.filter(transaction => (new Date(transaction.trans_date) >= firstDate && new Date(transaction.trans_date) <= secondDate));
    };

    const myDateToString = (year, month, day) => {
      const months = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"};
      return `${months[month]} ${day}, ${year}`;
    };

    return (
      <div className="TransactionList">
        {!secondDate
        ? <h2>Transactions on {myDateToString(firstDateYear, firstDateMonth, firstDateDay)}</h2>
        : <h2>Transactions from {myDateToString(firstDateYear, firstDateMonth, firstDateDay)} to {myDateToString(secondDateYear, secondDateMonth, secondDateDay)}</h2>
        }
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
            {transactions_date.reverse().map((transaction) => (
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
