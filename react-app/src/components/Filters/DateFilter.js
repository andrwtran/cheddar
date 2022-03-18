import React from "react";
import { useSelector } from 'react-redux';
import TransactionList from '../TransactionList/TransactionList';
import { selectTransactionsByDate } from "../../store/transaction/selectors";

const DateFilter = ({filterQuery}) => {
  const transactionsByDate = useSelector(state => selectTransactionsByDate(state, filterQuery));

  const firstDateYear = (filterQuery.indexOf("&") === -1) ?
    parseInt(filterQuery.slice(0,4)) :
    parseInt(filterQuery.split('&')[0].slice(0,4));
  const firstDateMonth = (filterQuery.indexOf("&") === -1) ?
    parseInt(filterQuery.slice(4,6)) :
    parseInt(filterQuery.split('&')[0].slice(4,6));
  const firstDateDay = (filterQuery.indexOf("&") === -1) ?
    parseInt(filterQuery.slice(6)) :
    parseInt(filterQuery.split('&')[0].slice(6));

  const secondDateYear = (filterQuery.indexOf("&") === -1) ? null : parseInt(filterQuery.split('&')[1].slice(0,4));
  const secondDateMonth = (filterQuery.indexOf("&") === -1) ? null : parseInt(filterQuery.split('&')[1].slice(4,6));
  const secondDateDay = (filterQuery.indexOf("&") === -1) ? null : parseInt(filterQuery.split('&')[1].slice(6));

  const firstDate = new Date(Date.UTC(firstDateYear,firstDateMonth-1,firstDateDay))
  const secondDate = (filterQuery.indexOf("&") === -1) ? null : new Date(Date.UTC(secondDateYear,secondDateMonth-1,secondDateDay));

  const myDateToString = (year, month, day) => {
    const months = { 1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun", 7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"};
    return `${months[month]} ${day}, ${year}`;
  };

  const dates = !secondDate
            ? myDateToString(firstDateYear, firstDateMonth, firstDateDay)
            : myDateToString(firstDateYear, firstDateMonth, firstDateDay) + " to " + myDateToString(secondDateYear, secondDateMonth, secondDateDay);

  return transactionsByDate.length
    ?
    <TransactionList transactions={transactionsByDate} title={`${dates} Transactions`}/>
    :
    <div className="TransactionList">
      <h3>Date Transactions</h3>
      <p> No Matching Transactions </p>
    </div>
};

export default DateFilter;
