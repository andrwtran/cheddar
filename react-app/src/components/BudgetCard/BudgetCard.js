import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgets } from '../../store/budget';
import { getTransactions } from '../../store/transaction';
// import { getCategories } from '../../store/category';
import BudgetPieChart from '../BudgetPieChart/BudgetPieChart';
import BudgetBarChart from '../BudgetBarChart/BudgetBarChart';
// import BudgetEdit from '../BudgetEdit/BudgetEdit';
import BudgetList from '../BudgetList/BudgetList';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import "./BudgetCard.css"

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export default function BudgetCard() {
  const [isEdit, setIsEdit] = useState(false);

  const dispatch = useDispatch();

  const budgets = useSelector((state) => state.budget.all);
  const transactions = useSelector((state) => state.transaction.all);
  // const categories = useSelector((state) => state.category);

  const today = new Date();
  const days_in_month = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate() -  today.getDate();

  useEffect(() => {
    dispatch(getBudgets());
    dispatch(getTransactions());
    // dispatch(getCategories());
  }, [dispatch]);


  if (!budgets.length || !transactions.length) return null;

  return (
    <div className='BudgetCard'>
      {/* <BudgetEdit budgets={budgets} categories={categories} /> */}
      <BudgetList budgets={budgets} isEdit={isEdit} setIsEdit={setIsEdit} />
      <BudgetPieChart budgets={budgets} transactions={transactions} days_in_month={days_in_month} today={today}/>
      <BudgetBarChart budgets={budgets} transactions={transactions} today={today}/>
      <button id='EditBudgetsButton' onClick={() => setIsEdit(true)}>Edit Budgets</button>
    </div>
  );
};
