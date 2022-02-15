import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import  ReactDOM  from 'react-dom';
import "./TransactionFilter.css";

export default function TransactionFilter({ isFilterCat, isFilterAcc, setIsFilterCat, setIsFilterAcc }) {
  let history = useHistory();

  const accounts = useSelector((state) => state.account.byId);
  const categories = useSelector((state) => state.category);

  const [categoryId, setCategoryId] = useState(2);
  const [accountId, setAccountId] = useState(1);

  const reset = () => {
    setIsFilterCat(false);
    setIsFilterAcc(false);
  }

  const filterCatClick = () => {
    reset();
    history.push(`/transactions/category/${categoryId}`)
  };

  const filterAccClick = () => {
    reset();
    history.push(`/transactions/account/${accountId}`)
  };

  if (isFilterCat) {
    return ReactDOM.createPortal(
      <>
        <div className="TransactionFilterOverlay" onClick={reset}></div>
        <div className='TransactionFilter scale-up-center'>
          <form onSubmit={filterCatClick}>
            <h3><i className="fas fa-money-bill-wave" /> Transactions</h3>
            <label>by Category</label>
            <select
              onChange={(e) => setCategoryId(e.target.value)}
              value={categoryId}
              name="categoryId"
              id="CategoryFilter"
            >
              {Object.values(categories).slice(1).map((category) => (
                <option value={category.id}>{category.category_name}</option>
                )
              )}
            </select>
            <span className="TransactionFilterButtons">
              <button type="submit">Filter</button>
              <button onClick={reset}>Close</button>
            </span>
          </form>
        </div>
      </>,
    document.getElementById('root'))
  };

  if (isFilterAcc) {
    return ReactDOM.createPortal(
      <>
        <div className="TransactionFilterOverlay" onClick={reset}></div>
        <div className='TransactionFilter scale-up-center'>
          <form>
            <h3><i className="fas fa-money-bill-wave" /> Transactions</h3>
            <label>by Account</label>
            <select
                onChange={(e) => setAccountId(e.target.value)}
                value={accountId}
                name="accountId"
                id="AccountFilter"
              >
                {Object.values(accounts).map((account) => (
                  <option value={account.id}>{account.account_name}</option>
                  )
                )}
            </select>
            <span className="TransactionFilterButtons">
              <button onClick={filterAccClick}>Filter</button>
              <button onClick={reset}>Close</button>
            </span>
          </form>
        </div>
      </>,
    document.getElementById('root'))
  };

  return null
};
