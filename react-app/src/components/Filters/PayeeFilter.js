import React from "react";
import { useSelector } from 'react-redux';
import TransactionList from '../TransactionList/TransactionList';
import { selectTransactionsByPayee } from "../../store/transaction/selectors";

const PayeeFilter = ({filterQuery}) => {
  const transactionsByPayee = useSelector(state => selectTransactionsByPayee(state, filterQuery));
  const payeeName = transactionsByPayee[0].trans_payee;

  return transactionsByPayee.length
    ?
    <TransactionList transactions={transactionsByPayee} title={`${payeeName} Transactions`}/>
    :
    <div className="TransactionList">
      <h3>Payee Transactions</h3>
      <p> No Matching Transactions </p>
    </div>
};

export default PayeeFilter;
