const LOAD_BUDGETS = 'budgets/LOAD_BUDGETS';
const UPDATE_BUDGET = 'budgets/UPDATE_BUDGET';

const load = (budgets) => {
  return { type: LOAD_BUDGETS, budgets };
};

const update = (budget) => {
  return { type: UPDATE_BUDGET, budget }
};

export const getBudgets = () => async (dispatch) => {
  const response = await fetch('/api/budgets/');

  if (response.ok) {
    const budgets = await response.json();
    dispatch(load(budgets.all_budgets));
    return budgets;
  };
};

export const updateBudget = (data) => async (dispatch) => {
  const response = await fetch(`/api/budgets/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const budget = await response.json();
    dispatch(update(budget));
    return budget;
  }
};

const initialState = { byId: {}, all: [] };

const budgetReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOAD_BUDGETS: {
      const newState = { byId: { }, all: [ ] };
      for (let i = 0; i < action.budgets.length; i++) {
        let budget = action.budgets[i];
        newState.byId[budget.id] = budget;
        newState.all.push(budget);
      }
      return newState;
    };
    case UPDATE_BUDGET: {
      const newState = { byId: { ...state.byId }, all: [ ...state.all] };
      const editBudget = action.budget;
      newState.byId[editBudget.id] = editBudget;
      const updateIndex = newState.all.findIndex((budget) => budget.id === editBudget.id);
      newState.all[updateIndex] = editBudget;
      return newState;
    };
    default:
      return state;
  };

};

export default budgetReducer;
