import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import  ReactDOM  from 'react-dom';
import Backdrop from '../Backdrop/Backdrop';
import { motion } from "framer-motion";
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

  const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    },
    exit: {
      y: "100vh",
      opacity: 0
    }
  };

  return ReactDOM.createPortal(
    <Backdrop onClick={reset}>
      {/* <div className="TransactionSearchOverlay" onClick={reset}> </div> */}
      <motion.div
      className='TransactionSearch'
      key="Payee-Search"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={(e) => e.stopPropagation()}
      >
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
      </motion.div>
    </Backdrop>,
  document.getElementById('root'));
};
