import React from "react";
import { useDispatch } from 'react-redux';
import { deleteTransaction } from "../../store/transaction";
import './TransactionDelete.css';

export default function TransactionDelete({ oldTransaction }) {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteTransaction(oldTransaction));
  };

  return (
    <div className='TransactionDelete'>
      <button className="TransactionDeleteButton" onClick={handleSubmit}>
        Delete
      </button>
    </div>
  );
}
