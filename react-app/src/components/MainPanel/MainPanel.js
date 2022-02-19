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
      <Switch>
        <Route exact path='/transactions'>
          <TransactionList />
        </Route>
        <Route path='/transactions/category/:categoryId'>
          <TransactionList />
        </Route>
        <Route path='/transactions/account/:accountId'>
          <TransactionList />
        </Route>
        <Route path ='/transactions/date/:dateQuery'>
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
