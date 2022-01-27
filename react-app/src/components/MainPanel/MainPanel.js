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
        <Route exact path='/transactions'>
          <TransactionList />
        </Route>
        <Route path='/transactions/19'>
          <TransactionList categoryId={19} categoryName={'Shopping'} />
        </Route>
        <Route path='/transactions/13'>
          <TransactionList categoryId={13} categoryName={'Groceries'} />
        </Route>
        <Route path='/transactions/6'>
          <TransactionList categoryId={6} categoryName={'Dining & Drinks'} />
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
