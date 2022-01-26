import React from 'react';
import { Route, Switch } from "react-router-dom";
import TransactionList from '../TransactionList/TransactionList';
import BudgetCard from '../BudgetCard/BudgetCard';
import TransactionCard from '../TransactionCard/TransactionCard';
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
          <TransactionCard />
          <div className='CategorySpendingCard'><h3>Top Categories</h3></div>
          <div className='MonthlySpendingCard'><h3>Spend</h3></div>
        </Route>
      </Switch>
    </div>
  );
};

export default MainPanel;
