import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgets } from '../../store/budget';
import { getTransactions } from '../../store/transaction';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import "./BudgetCard.css"

ChartJS.register(ArcElement, Tooltip, Legend);

export default function BudgetCard() {
  const dispatch = useDispatch();

  const budgets = useSelector((state) => state.budget.all);
  const transactions = useSelector((state) => state.transaction.all);

  const today = new Date();

  const transactions_monthly = transactions.filter(transaction => new Date(transaction.trans_date).getMonth() === today.getMonth())


  useEffect(() => {
    dispatch(getBudgets());
    dispatch(getTransactions());
  }, [dispatch]);

  // const spend_total = transactions.reduce((acc, el) => acc + el.trans_amount, 0);
  const spend_monthly = transactions_monthly.reduce((acc, el) => acc + el.trans_amount, 0);

  let budget_monthly;
  let budget_left;
  let data;

  // const budget_total_rem = (budgets[0].budget_amount - spend_monthly)/(budgets[0].budget_amount)/100;
  if (budgets.length) {
    budget_monthly = budgets[0].budget_amount;
    budget_left = budget_monthly - spend_monthly;
    data = {
      labels: ['Spent', 'Left'],
      datasets: [
        {
          label: '# of Votes',
          data: [spend_monthly, budget_left],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1,
        },
      ],
    };
  }


  return (
    <div className='BudgetCard'>
      <h3>Budget</h3>
      <span className='BudgetTotalChart'>
        {data !== undefined && <Pie data={data} />}
      </span>
      <ul>
        {/* {budgets.map((budget) => (
          <>
            <li>{budget.budget_name} {budget.budget_amount}</li>
          </>
        ))} */}
        {budgets.length &&
          <>
            <li>Monthly Spend ${spend_monthly.toFixed(2)}</li>
            <li>Budget Left ${budgets[0].budget_amount - spend_monthly.toFixed(2)}</li>
          </>
        }
      </ul>
    </div>
  );
};
