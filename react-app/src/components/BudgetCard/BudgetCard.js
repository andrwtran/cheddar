import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBudgets } from '../../store/budget';
import { getTransactions } from '../../store/transaction';
import { Pie } from 'react-chartjs-2';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import "./BudgetCard.css"

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function BudgetCard() {
  const dispatch = useDispatch();

  const budgets = useSelector((state) => state.budget.all);
  const transactions = useSelector((state) => state.transaction.all);

  const today = new Date();
  const days_in_month = new Date(today.getFullYear(), today.getMonth()+1, 0).getDate() -  today.getDate();

  const transactions_monthly = transactions.filter(transaction => new Date(transaction.trans_date).getMonth() === today.getMonth())

  useEffect(() => {
    dispatch(getBudgets());
    dispatch(getTransactions());
  }, [dispatch]);

  const spend_monthly = transactions_monthly.reduce((acc, el) => acc + el.trans_amount, 0);

  const bar_options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Category Spending',
        color: 'black',
        font: {
          size: '20',
          family: "'Montserrat', sans-serif",
        },
      },
    },
  };

const bar_labels = budgets.slice(1).map(budget => budget.budget_name);
const bar_budget_data = budgets.slice(1).map(budget => budget.budget_amount);

console.log(bar_labels);
console.log(bar_budget_data);

const bar_data = {
  labels: bar_labels,
  datasets: [{
    axis: 'y',
    data: bar_budget_data,
    fill: false,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
    ],
    borderWidth: 1
  }]
};

  let budget_monthly;
  let budget_left;
  let budget_left_daily;
  let pie_data;

  if (budgets.length) {
    budget_monthly = budgets[0].budget_amount;
    budget_left = budget_monthly - spend_monthly;
    budget_left_daily = budget_left / days_in_month;
    pie_data = {
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
      ],
    };
  }

  const pie_options = {
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
  };


  return (
    <div className='BudgetCard'>
      <span className='BudgetTotalChart'>
        {pie_data !== undefined && <Pie options={pie_options} data={pie_data} />}
      </span>
      <span className='BudgetText'>
        <ul>
          {/* {budgets.map((budget) => (
            <>
              <li>{budget.budget_name} {budget.budget_amount}</li>
            </>
          ))} */}
          {budgets.length &&
            <>
              <li>Monthly Spend ${spend_monthly.toFixed(2)}</li>
              <li>Budget Left ${(budgets[0].budget_amount - spend_monthly).toFixed(2)}</li>
              <li>( ${budget_left_daily.toFixed(2)} per day )</li>
            </>
          }
        </ul>
      </span>
      <span className='BudgetBarChart'>
        <Bar options={bar_options} data={bar_data} />
      </span>
    </div>
  );
};
