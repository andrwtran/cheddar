import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import  ReactDOM  from 'react-dom';
import './TransactionSearch.css';

export default function TransactionSearch({ setIsSearch, transactions }) {
  const [payeeQuery, setPayeeQuery] = useState('');

  const uniques = new Set();

  transactions.forEach((transaction) => {
    let payee = transaction.trans_payee;
    uniques.add(payee);
  });

  const payees = [...uniques].sort();

  let history = useHistory();

  const reset = () => {
    // setPayeeQuery('');
    setIsSearch(false);
  };

  const searchPayeeClick = () => {
    reset();
    const searchParams = encodeURIComponent(payeeQuery);
    history.push(`/transactions/payee/${searchParams}`);
  };

  return ReactDOM.createPortal(
    <>
      <div className="TransactionSearchOverlay" onClick={reset}> </div>
      <div className='TransactionSearch scale-up-center'>
        <div>
          <h3><i className="fa-solid fa-money-bill-wave" /> Transactions</h3>
            <label>by Payee</label>
            <input
              // type="search"
              onChange={(e) => setPayeeQuery(e.target.value)}
              value={payeeQuery}
              name="payeeQuery"
              list="payee_names"
              autoComplete='off'
              autoFocus
            />
            <datalist id="payee_names">
              {payees.map((payee) => (
                <option value={`${payee}`}></option>
              ))}
            </datalist>
          <span className="TransactionSearchButtons">
            <button onClick={searchPayeeClick}>Filter</button>
            <button onClick={reset}>Close</button>
          </span>
        </div>
      </div>
    </>,
  document.getElementById('root'));
};
