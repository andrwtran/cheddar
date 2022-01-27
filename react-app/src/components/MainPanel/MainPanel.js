import React from 'react';
import { Route, Switch } from "react-router-dom";
import TransactionList from '../TransactionList/TransactionList';
import BudgetCard from '../BudgetCard/BudgetCard';
import TransactionCard from '../TransactionCard/TransactionCard';
import CategoryCard from '../CategoryCard/CategoryCard';
import "./MainPanel.css"

const MainPanel = () => {

  return (
    <div className='MainPanel'>
      {/* <h2>Main Panel</h2> */}
      <Switch>
        <Route path='/transactions'>
          <TransactionList />
        </Route>
        <Route path='/'>
          <BudgetCard />
          <TransactionCard />
          <CategoryCard />
        </Route>
      </Switch>
    </div>
  );
};

export default MainPanel;
