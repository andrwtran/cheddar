import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import  ReactDOM  from 'react-dom';
import "react-datepicker/dist/react-datepicker.css";
import "./TransactionFilter.css";

export default function TransactionFilter({ isFilterDate, isFilterCat, isFilterAcc, setIsFilterDate, setIsFilterCat, setIsFilterAcc }) {
  let history = useHistory();

  const accounts = useSelector((state) => state.account.byId);
  const categories = useSelector((state) => state.category);

  const [categoryId, setCategoryId] = useState(2);
  const [accountId, setAccountId] = useState(1);
  // const [date, setDate] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const reset = () => {
    setIsFilterCat(false);
    setIsFilterAcc(false);
    setIsFilterDate(false);
  }

  const filterCatClick = () => {
    reset();
    history.push(`/transactions/category/${categoryId}`)
  };

  const filterAccClick = () => {
    reset();
    history.push(`/transactions/account/${accountId}`)
  };

  const filterDateClick = () => {
    reset();
    history.push() // `/transactions/date/${DATESTRING}`
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
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

  if (isFilterDate) {
    return ReactDOM.createPortal(
      <>
        <div className="TransactionFilterOverlay" onClick={reset}></div>
        <div className='TransactionFilter scale-up-center'>
          {/* <form> */}
          <div>
            <h3><i className="fas fa-money-bill-wave" /> Transactions</h3>
            {/* <label>by Date</label> */}
            {/* <select
                onChange={(e) => setAccountId(e.target.value)}
                value={accountId}
                name="accountId"
                id="AccountFilter"
              >
                {Object.values(accounts).map((account) => (
                  <option value={account.id}>{account.account_name}</option>
                  )
                )}
            </select> */}
            {/* <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            /> */}
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
            <span className="TransactionFilterButtons">
              <button onClick={filterDateClick}>Filter</button>
              <button onClick={reset}>Close</button>
            </span>
          </div>
          {/* </form> */}
        </div>
      </>,
    document.getElementById('root'))
  };

  return null
};
