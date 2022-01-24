import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteAccount } from '../../store/account';
import './AccountDelete.css';

export default function AccountDelete({ oldAccount }) {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(deleteAccount(oldAccount));
  };

  return (
    <div className='AccountDelete'>
      <button className="AccountDeleteButton" onClick={handleSubmit}>
        <i className="fas fa-trash" />
      </button>
    </div>
  );
};
