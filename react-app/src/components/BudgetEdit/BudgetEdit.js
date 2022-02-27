import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBudget } from '../../store/budget';
import './BudgetEdit.css';


export default function BudgetEdit({ budgets, budget, setIsEdit }) {
  const [amount, setAmount] = useState(budget.budget_amount);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (amount < 0) {
      return alert("Budget amount must be a positive number.");
    };

    if (!amount) {
      return alert("You must enter a budget amount.")
    };

    if (budget.categoryId === 1) {
      const category = budgets.filter(budget => budget.categoryId !== 1);
      const category_amount = category.reduce((acc, budget) => acc + budget.budget_amount, 0);
      const total_amount = parseInt(amount);

      if (category_amount > total_amount) {
        console.log(category_amount, total_amount);
        setAmount(budget.budget_amount);
        return alert("Monthly budget amount must be greater than category budgets.")
      };
    } else {
      const total = budgets.find(budget => budget.categoryId === 1);
      const total_amount = total.budget_amount;

      const categoryId = budget.categoryId;
      const other_category = budgets.filter(budget => budget.categoryId !== 1 && budget.categoryId !== categoryId);
      const category_amount = other_category.reduce((acc, budget) => acc + budget.budget_amount, 0) + parseInt(amount);

      if (category_amount > total_amount) {
        console.log(category_amount, total_amount);
        setAmount(budget.budget_amount);
        return alert("Monthly budget amount must be greater than category budgets.")
      };
    };

    const editBudget = {
      id: budget.id,
      budget_name: budget.budget_name,
      budget_amount: amount,
      categoryId: budget.categoryId,
      userId: budget.userId
    };
    dispatch(updateBudget(editBudget));
    setIsEdit(false);
  };

  if (!budgets) {
    return null;
  };

  return (
    <div className='BudgetEditForm'>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          name="amount"
        />
        <button className='submit-button' type="submit">Save</button>
      </form>
    </div>
  );
};
