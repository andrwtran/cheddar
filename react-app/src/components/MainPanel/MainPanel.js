import React from 'react';
import { Route, Switch } from "react-router-dom";
import { useSelector } from 'react-redux';
import AccountFilter from '../Filters/AccountFilter';
import CategoryFilter from '../Filters/CategoryFilter';
import DateFilter from '../Filters/DateFilter';
import PayeeFilter from '../Filters/PayeeFilter';
import TransactionList from '../TransactionList/TransactionList';
import BudgetCard from '../BudgetCard/BudgetCard';
import TransactionCard from '../TransactionCard/TransactionCard';
import CategoryCard from '../CategoryCard/CategoryCard';
import { useFilter } from '../../context/FilterContext';
import "./MainPanel.css"

const MainPanel = () => {
  const { filterQuery } = useFilter();

  const transactions = useSelector((state) => state.transaction.all);

  return (
    <div className='MainPanel'>
      <Switch>
        <Route exact path='/transactions'>
          <TransactionList transactions={transactions} title={'All Transactions'}/>
        </Route>
        <Route path='/transactions/category/'>
          <CategoryFilter filterQuery={filterQuery}/>
        </Route>
        <Route path='/transactions/account/'>
          <AccountFilter filterQuery={filterQuery}/>
        </Route>
        <Route path ='/transactions/date/'>
          <DateFilter filterQuery={filterQuery}/>
        </Route>
        <Route path ='/transactions/payee/'>
          {/* <TransactionList /> */}
          <PayeeFilter filterQuery={filterQuery}/>
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
