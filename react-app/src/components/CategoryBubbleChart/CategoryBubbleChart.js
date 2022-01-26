import React from 'react';
import { useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import "./CategoryBubbleChart.css"

export default function BudgetPieChart({ transactions, categories, today }) {
  const transactions_monthly = transactions.filter(transaction => new Date(transaction.trans_date).getMonth() === today.getMonth());

  const spend_monthly_byCat = {};

  transactions_monthly.forEach(transaction => {
    if (spend_monthly_byCat[transaction.categoryId]) {
      spend_monthly_byCat[transaction.categoryId] += transaction.trans_amount;
    }
    else {
      spend_monthly_byCat[transaction.categoryId] = transaction.trans_amount;
    };
  });

  console.log(spend_monthly_byCat);
  console.log(Object.values(spend_monthly_byCat));
  console.log(Object.keys(spend_monthly_byCat).map(key => categories[key].category_name));

  const [userData, setUserData] = useState(
    {
      labels: Object.keys(spend_monthly_byCat).map(key => categories[key].category_name),
      datasets: [
        {
          data: Object.values(spend_monthly_byCat),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        }
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
      },
    }
  );


  return (
    <span className='CategoryBubbleChart'>
      <Doughnut options={userOptions} data={userData} />
    </span>
  );
};
