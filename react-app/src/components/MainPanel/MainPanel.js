import React from 'react';
import "./MainPanel.css"

const MainPanel = () => {
  return (
    <div className='MainPanel'>
      <h2>Main Panel</h2>
      <div className='BudgetCard'><h3>Budget</h3></div>
      <div className='RecentTransCard'><h3>Recent Transactions</h3></div>
      <div className='CategorySpendingCard'><h3>Top Categories</h3></div>
      <div className='MonthlySpendingCard'><h3>Spend</h3></div>
      <div className='MonthlyEarningCard'><h3>Earn</h3></div>
    </div>
  );
};

export default MainPanel;
