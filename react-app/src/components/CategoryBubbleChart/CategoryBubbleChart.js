import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
// import { getCategories } from '../../store/category';
// import { getTransactions } from '../../store/transaction';
import { Doughnut } from 'react-chartjs-2';
import "./CategoryBubbleChart.css"

export default function BudgetPieChart({ transactions, categories, today }) {
  // const dispatch = useDispatch();

  // const transactions = useSelector((state) => state.transaction.all);
  // const categories = useSelector((state) => state.category);

  // useEffect(() => {
  //   dispatch(getCategories());
  //   dispatch(getTransactions());
  // }, [dispatch]);

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

  const [userData, setUserData] = useState(
    {
      labels: Object.keys(spend_monthly_byCat).map(key => categories[key-1].category_name),
      datasets: [
        {
          data: Object.values(spend_monthly_byCat),
          backgroundColor: [
            '#A6CEE3',
            '#1F78B4',
            '#B2DF8A',
            '#33A02C',
            '#FB9A99',
            '#E31A1C',
            '#FDBF6F',
            '#FF7F00',
            '#CAB2D6',
            '#6A3D9A',
            '#F2EC94',
            '#B15928',
          ],
          borderColor: [
            '#A6CEE3',
            '#1F78B4',
            '#B2DF8A',
            '#33A02C',
            '#FB9A99',
            '#E31A1C',
            '#FDBF6F',
            '#FF7F00',
            '#CAB2D6',
            '#6A3D9A',
            '#F2EC94',
            '#B15928',
          ],
          borderWidth: 2,
        }
      ]
    }
  );


  const [userOptions, setUserOptions] = useState(
    {
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: 'black',
            font: {
              size: '18',
              family: "'Montserrat', sans-serif",
            },
          }
        },
      },
    }
  );

  if (!categories.length || !transactions.length) {
    return null
  }

  return (
    <span className='CategoryBubbleChart'>
      <Doughnut options={userOptions} data={userData} />
    </span>
  );
};
