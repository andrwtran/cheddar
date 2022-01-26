import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgets } from '../../store/budget';
import { getTransactions } from '../../store/transaction';
import BudgetPieChart from '../BudgetPieChart/BudgetPieChart';
import BudgetBarChart from '../BudgetBarChart/BudgetBarChart';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import "./BudgetCard.css"

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function BudgetCard() {
  const dispatch = useDispatch();

  const budgets = useSelector((state) => state.budget.all);
  const transactions = useSelector((state) => state.transaction.all);

  const today = new Date();
  const days_in_month = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate() -  today.getDate();

  useEffect(() => {
    dispatch(getBudgets());
    dispatch(getTransactions());
  }, [dispatch]);


  if (!budgets.length) return null

  return (
    <div className='BudgetCard'>
      <BudgetPieChart budgets={budgets} transactions={transactions} days_in_month={days_in_month} today={today}/>
      <BudgetBarChart budgets={budgets} transactions={transactions} today={today}/>
    </div>
  );
};
