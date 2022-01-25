const LOAD_BUDGETS = 'budgets/LOAD_BUDGETS';

const load = (budgets) => {
  return { type: LOAD_BUDGETS, budgets };
};

export const getBudgets = () => async (dispatch) => {
  const response = await fetch('/api/budgets/');

  if (response.ok) {
    const budgets = await response.json();
    dispatch(load(budgets.all_budgets));
    return budgets;
  };
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
    default:
      return state;
  };

};

export default budgetReducer;
