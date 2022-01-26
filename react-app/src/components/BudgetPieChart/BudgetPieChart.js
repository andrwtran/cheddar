import React from 'react';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import "./BudgetPieChart.css"

export default function BudgetPieChart({ budgets, transactions, today, days_in_month}) {

  const transactions_monthly = transactions.filter(transaction => new Date(transaction.trans_date).getMonth() === today.getMonth());
  const spend_monthly = transactions_monthly.reduce((acc, el) => acc + el.trans_amount, 0);

  const budget_monthly = budgets[0].budget_amount;
  const budget_left = budget_monthly - spend_monthly;
  const budget_left_daily = budget_left / days_in_month;

  const [userData, setUserData] = useState(
    {
      labels: ['Spent', 'Left'],
      datasets: [
        {
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
      ]
    }
  );

  const [userOptions, setUserOptions] = useState(
    {
      responsive: true,
      plugins: {
        legend: {
          labels: {
            color: 'black',
            font: {
              size: '12',
              family: "'Montserrat', sans-serif",
            },
          }
        },
        title: {
          display: true,
          text: 'Monthly Budget',
          color: 'black',
          font: {
            size: '20',
            family: "'Montserrat', sans-serif",
          },
        },
      },
    }
  );

  if (!budgets.length || !transactions.length) {
    return null
  }

  return (
  <>
  <span className='BudgetPieChart'>
    <Pie options={userOptions} data={userData} />
  </span>
  <span className='BudgetPieText'>
      <ul>
        {budgets.length &&
          <>
            <li>Monthly Budget ${budgets[0].budget_amount.toFixed(2)}</li>
            <li>Monthly Spend ${spend_monthly.toFixed(2)}</li>
            <li>Budget Left ${(budgets[0].budget_amount - spend_monthly).toFixed(2)}</li>
            <li>( ${budget_left_daily.toFixed(2)} per day )</li>
          </>
        }
      </ul>
    </span>
  </>
  );
}
