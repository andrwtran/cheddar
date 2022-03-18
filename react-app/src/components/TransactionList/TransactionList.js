import React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { currencyFormatter, dateConverter, tableSorter } from "../../utils";
import { useFilter } from '../../context/FilterContext';
import TransactionEdit from "../TransactionEdit/TransactionEdit";
import './TransactionList.css';

const TransactionList = ({ transactions, title }) => {
  const history = useHistory();

  const { filterQuery } = useFilter();

  const accounts = useSelector((state) => state.account.byId);
  const categories = useSelector((state) => state.category);

  const [editId, setEditId] = useState();

  useEffect(() => {
    addSort();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    return history.listen(() => {
       removeSortClass();
    })
 },[history]);

 useEffect(() => {
  removeSortClass();
 }, [filterQuery]);

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
      const table = header.parentElement.parentElement.parentElement;
      table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    });
  };

  return (
    <div className="TransactionList">
      <h3>{title}</h3>
      <table>
        <colgroup>
          <col className='TableDate'></col>
          <col className='TablePayee'></col>
          <col className='TableAmount'></col>
          <col className='TableCategory'></col>
          <col className='TableAccount'></col>
          <col className='TableButtons'></col>
        </colgroup>
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

  // if (filterQuery.startsWith("payee")) {

  //   if (!payeeTransactions) {
  //     return (
  //       <div className="TransactionList">
  //         <h3>Payee Transactions</h3>
  //         <p> No Matching Transactions </p>
  //       </div>
  //     );
  //   };

  //   if (!payeeTransactions.length) {
  //     return <div></div>
  //   }

  //   return (
  //     <div className="TransactionList">
  //       <h3>Payee Transactions</h3>
  //       <table>
  //         <col className='TableDate'></col>
  //         <col className='TablePayee'></col>
  //         <col className='TableAmount'></col>
  //         <col className='TableCategory'></col>
  //         <col className='TableAccount'></col>
  //         <col className='TableButtons'></col>
  //         <thead>
  //           <tr>
  //             <th>Date</th>
  //             <th>Payee</th>
  //             <th>Amount</th>
  //             <th>Category</th>
  //             <th>Account</th>
  //             <th className="TableButtons"></th>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {payeeTransactions.map((transaction) => (
  //             <tr key={transaction.id}>
  //               {editId !== transaction.id &&
  //                 <>
  //                   <td>{dateConverter(transaction.trans_date)}</td>
  //                   <td>{transaction.trans_payee}</td>
  //                   <td>{currencyFormatter.format(transaction.trans_amount)}</td>
  //                   <td>{categories[transaction.categoryId - 1]?.category_name}</td>
  //                   <td>{accounts[transaction.accountId]?.account_name}</td>
  //                 </>
  //               }
  //               <TransactionEdit
  //               transaction={transaction}
  //               editId={editId}
  //               setEditId={setEditId}
  //               accounts={accounts}
  //               categories={categories}
  //               />
  //             </tr>
  //             )
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   );
  // };

};

export default TransactionList;
