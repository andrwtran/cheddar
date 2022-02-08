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
