import React from "react";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { getTransactions } from "../../store/transaction";
// import { getAccounts } from "../../store/account";
// import { getCategories } from "../../store/category";
import { currencyFormatter, dateConverter, tableSorter } from "../../utils";
import TransactionEdit from "../TransactionEdit/TransactionEdit";
import './TransactionList.css';

const TransactionList = () => {
  // const dispatch = useDispatch();
  const history = useHistory();
  const transactions = useSelector((state) => state.transaction.all);
  const accounts = useSelector((state) => state.account.byId);
  const categories = useSelector((state) => state.category);

  const [editId, setEditId] = useState();
  const [payeeTransactions, setPayeeTransactions] = useState([]);

  const { categoryId, accountId, dateQuery, payeeQuery } = useParams();

  const num_transactions = transactions.length;
  const num_accounts = Object.keys(accounts).length;

  const searchPayee = async () => {
    if (!searchPayee) return null;
    // console.log("PAYEE SEARCHED")
    const searchParams = encodeURIComponent(payeeQuery)

    const response = await fetch(`/api/transactions/filter?payee=${searchParams}`);

    if (response.ok) {
      const matches = await response.json();
      matches.payee_transactions.length ? setPayeeTransactions(matches.payee_transactions) : setPayeeTransactions(null);
      addSort();
    };
  };

  useEffect(() => {
    addSort();
    // console.log("SORT ADDED")
  }, []);

  useEffect(() => {
    return history.listen(() => {
       removeSortClass();
      //  console.log("SORT REMOVED")
    })
 },[history]);

  // useEffect(() => {
  //   dispatch(getTransactions());
  //   dispatch(getAccounts());
  //   dispatch(getCategories());
  // }, [dispatch, num_transactions, num_accounts]);

  useEffect(() => {
    if (payeeQuery) searchPayee();
  }, [payeeQuery, num_transactions, num_accounts, editId, searchPayee]);

  const addSort = () => {
    document.querySelectorAll("th").forEach(header => {
      header.addEventListener("click", () => {
        const table = header.parentElement.parentElement.parentElement;
        const index = Array.prototype.indexOf.call(header.parentElement.children, header);
        const asc = header.classList.contains("th-sort-asc");

        tableSorter(table, index, !asc);
      });
    });
  };

  const removeSortClass = () => {
    document.querySelectorAll("th").forEach(header => {
      // header.removeEventListener("click", addSort);
      const table = header.parentElement.parentElement.parentElement;
      table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    });
  };

  if (payeeQuery) {

    if (!payeeTransactions) {
      return (
        <div className="TransactionList">
          <h3>Payee Transactions</h3>
          <p> No Matching Transactions </p>
        </div>
      );
    };

    if (!payeeTransactions.length) {
      return <div></div>
    }

    return (
      <div className="TransactionList">
        <h3>Payee Transactions</h3>
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
            {payeeTransactions.map((transaction) => (
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

  if (categoryId) {
    const transactions_category = transactions.filter(transaction => transaction.categoryId === +categoryId );

    if (transactions_category.length === 0) return (
      <div className="TransactionList">
        <h3>{categories[parseInt(categoryId)-1]?.category_name} Transactions</h3>
        <p> No Matching Transactions </p>
      </div>
    );

    return (
      <div className="TransactionList">
        <h3>{categories[parseInt(categoryId)-1]?.category_name} Transactions</h3>
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
    const transactions_account = transactions.filter(transaction => transaction.accountId === +accountId );

    if (transactions_account.length === 0) return (
      <div className="TransactionList">
        <h3>{accounts[parseInt(accountId)]?.account_name} Transactions</h3>
        <p> No Matching Transactions </p>
      </div>
    )
    return (
      <div className="TransactionList">
        <h3>{accounts[parseInt(accountId)]?.account_name} Transactions</h3>
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
            {transactions_account.map((transaction) => (
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
    const firstDateYear = (dateQuery.indexOf("&") === -1) ?
      parseInt(dateQuery.slice(0,4)) :
      parseInt(dateQuery.split('&')[0].slice(0,4));
    const firstDateMonth = (dateQuery.indexOf("&") === -1) ?
      parseInt(dateQuery.slice(4,6)) :
      parseInt(dateQuery.split('&')[0].slice(4,6));
    const firstDateDay = (dateQuery.indexOf("&") === -1) ?
      parseInt(dateQuery.slice(6)) :
      parseInt(dateQuery.split('&')[0].slice(6));

    const secondDateYear = (dateQuery.indexOf("&") === -1) ? null : parseInt(dateQuery.split('&')[1].slice(0,4));
    const secondDateMonth = (dateQuery.indexOf("&") === -1) ? null : parseInt(dateQuery.split('&')[1].slice(4,6));
    const secondDateDay = (dateQuery.indexOf("&") === -1) ? null : parseInt(dateQuery.split('&')[1].slice(6));

    const firstDate = new Date(Date.UTC(firstDateYear,firstDateMonth-1,firstDateDay))
    const secondDate = (dateQuery.indexOf("&") === -1) ? null : new Date(Date.UTC(secondDateYear,secondDateMonth-1,secondDateDay));

    const transactions_date = (dateQuery.indexOf("&") === -1) ?
      transactions.filter(transaction => (new Date(transaction.trans_date).getTime() === firstDate.getTime())) :
      transactions.filter(transaction => (new Date(transaction.trans_date) >= firstDate && new Date(transaction.trans_date) <= secondDate));

    const myDateToString = (year, month, day) => {
      const months = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"};
      return `${months[month]} ${day}, ${year}`;
    };

    if (transactions_date.length === 0) return (
      <div className="TransactionList">
        {!secondDate
          ? <h3>Transactions on {myDateToString(firstDateYear, firstDateMonth, firstDateDay)}</h3>
          : <h3>Transactions from {myDateToString(firstDateYear, firstDateMonth, firstDateDay)} to {myDateToString(secondDateYear, secondDateMonth, secondDateDay)}</h3>
        }
        <p> No Matching Transactions</p>
      </div>
    );

    return (
      <div className="TransactionList">
        {!secondDate
        ? <h3>Transactions on {myDateToString(firstDateYear, firstDateMonth, firstDateDay)}</h3>
        : <h3>Transactions from {myDateToString(firstDateYear, firstDateMonth, firstDateDay)} to {myDateToString(secondDateYear, secondDateMonth, secondDateDay)}</h3>
        }
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
      <h3>All Transactions</h3>
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
