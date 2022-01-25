import React from 'react';
import { Route, Switch } from "react-router-dom";
import TransactionList from '../TransactionList/TransactionList';
import BudgetCard from '../BudgetCard/BudgetCard';
import "./MainPanel.css"

const MainPanel = () => {

  return (
    <div className='MainPanel'>
      <h2>Main Panel</h2>
      <Switch>
        <Route path='/transactions'>
          <TransactionList />
        </Route>
        <Route path='/'>
          <BudgetCard />
          <div className='RecentTransCard'><h3>Recent Transactions</h3></div>
          <div className='CategorySpendingCard'><h3>Top Categories</h3></div>
          <div className='MonthlySpendingCard'><h3>Spend</h3></div>
          <div className='MonthlyEarningCard'><h3>Earn</h3></div>
        </Route>
      </Switch>
    </div>
  );
};

export default MainPanel;
