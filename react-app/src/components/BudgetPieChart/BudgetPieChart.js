import React from 'react';
import { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { currencyFormatter } from '../../utils';
import overbudget from '../../images/dangerzone.png';
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
              size: '14',
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
  };

  if (spend_monthly > budgets[0].budget_amount) {
    return (
      <>
        <span className='OverbudgetImage'>
          <img src={overbudget}></img>
        </span>
        <span className='OverbudgetText'>
          {budgets.length &&
            <>
              <p>You are {currencyFormatter.format((budgets[0].budget_amount - spend_monthly))} over your monthly budget!!!</p>
              <p>( {currencyFormatter.format(budget_left_daily)} per day )</p>
            </>
          }
        </span>
      </>
    );
  };

  return (
  <>
    <div className='BudgetPieChart'>
      <Pie options={userOptions} data={userData} />
    </div>
    <span className='BudgetPieText'>
      <ul>
        {budgets.length &&
          <>
            <li>Monthly Budget {currencyFormatter.format(budgets[0].budget_amount)}</li>
            <li>Monthly Spend {currencyFormatter.format(spend_monthly)}</li>
            <li>Budget Left {currencyFormatter.format((budgets[0].budget_amount - spend_monthly))}</li>
            <li>( {currencyFormatter.format(budget_left_daily)} per day )</li>
          </>
        }
      </ul>
    </span>
  </>
  );
}
