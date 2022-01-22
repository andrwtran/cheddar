const LOAD_TRANSACTIONS = 'transactions/LOAD_TRANSACTIONS';

const load = (transactions) => {
  return { type: LOAD_TRANSACTIONS, transactions };
};

export const getTransactions = () => async (dispatch) => {
  const response = await fetch('/api/transactions/');

  if (response.ok) {
    const transactions = await response.json();
    dispatch(load(transactions.all_transactions));
    return transactions;
  }
}

const initialState = { byId: {}, all: [] };

const transactionReducer = (state = initialState, action) => {

  switch (action.type) {

    case LOAD_TRANSACTIONS: {
      const newState = { byId: { ...state.byId }, all: [ ...state.all] };
      for (let i = 0; i < action.transactions.length; i++) {
        let transaction = action.transactions[i];
        newState.byId[transaction.id] = transaction;
        newState.all.push(transaction);
      }
      return newState;
    };
    default:
      return state;
  };
};

export default transactionReducer;
