import React from 'react';
import  ReactDOM  from 'react-dom';
import BudgetEdit from '../BudgetEdit/BudgetEdit';
import "./BudgetList.css"

export default function BudgetList({ budgets, isEdit, setIsEdit }) {

  if (!isEdit) {
    return null;
  };

  return ReactDOM.createPortal(
    <>
      <div className='BudgetListOverlay' onClick={() => setIsEdit(false)}></div>
      <div className='BudgetList scale-up-center'>
        <h3><i className="fa-solid fa-piggy-bank" /> Budgets</h3>
        <ul>
          {budgets.map((budget) => (
            <li key={budget.id}>
              {budget.budget_name} | {budget.budget_amount}
              <BudgetEdit budgets={budgets} budget={budget} setIsEdit={setIsEdit} />
            </li>
          )
          )}
        </ul>
        <button id='BudgetEditCloseButton' className='cancel-button' onClick={() => setIsEdit(false)}>Close</button>
      </div>
    </>,
    document.getElementById('root'));
};
