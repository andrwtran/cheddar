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

  const transactions_monthly = transactions.filter(transaction => new Date(transaction.trans_date).getMonth() === today.getMonth())


  useEffect(() => {
    dispatch(getBudgets());
    dispatch(getTransactions());
  }, [dispatch]);

  const spend_monthly = transactions_monthly.reduce((acc, el) => acc + el.trans_amount, 0);

  const bar_options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Monthly Spending',
      },
    },
  };

const bar_labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const bar_data = {
  labels: bar_labels,
  datasets: [{
    axis: 'y',
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};

  let budget_monthly;
  let budget_left;
  let pie_data;

  // const budget_total_rem = (budgets[0].budget_amount - spend_monthly)/(budgets[0].budget_amount)/100;
  if (budgets.length) {
    budget_monthly = budgets[0].budget_amount;
    budget_left = budget_monthly - spend_monthly;
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
    // indexAxis: 'y',
    // elements: {
    //   bar: {
    //     borderWidth: 2,
    //   },
    // },
    responsive: true,
    plugins: {
      // legend: {
      //   display: false,
      // },
      title: {
        display: true,
        text: 'Monthly Budget',
      },
    },
  };


  return (
    <div className='BudgetCard'>
      {/* <h3>Budget</h3> */}
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
