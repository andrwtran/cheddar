import { useState } from 'react';
import  ReactDOM  from 'react-dom';
import './TransactionSearch.css';

export default function TransactionEdit({ setIsSearch }) {
  const [date, setDate] = useState();
  const [payee, setPayee] = useState();
  const [amount, setAmount] = useState();
  const [categoryId, setCategoryId] = useState();
  const [accountId, setAccountId] = useState();

  const reset = () => {
    setDate('');
    setPayee('');
    setAmount('');
    setCategoryId('');
    setAccountId('');
    setIsSearch(false);
  };

  return ReactDOM.createPortal(
    <>
      <div className="TransactionSearchOverlay" onClick={reset}> </div>
      <div className='TransactionSearch scale-up-center'> IN PROGRESS </div>
    </>,
  document.getElementById('root'));
};
