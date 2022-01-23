const LOAD_TRANSACTIONS = 'transactions/LOAD_TRANSACTIONS';
const ADD_TRANSACTION = 'transactions/ADD_TRANSACTION';

const load = (transactions) => {
  return { type: LOAD_TRANSACTIONS, transactions };
};

const add = (newTransaction) => {
  return { type: ADD_TRANSACTION, newTransaction };
};

export const getTransactions = () => async (dispatch) => {
  const response = await fetch('/api/transactions/');

  if (response.ok) {
    const transactions = await response.json();
    dispatch(load(transactions.all_transactions));
    return transactions;
  }
}

export const createTransaction = (newTransaction) => async (dispatch) => {
  const response = await fetch(`/api/transactions/`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newTransaction)
  });
  const transaction = await response.json();

  if (response.ok) {
    dispatch(add(transaction));
    return transaction;
  };
};

const initialState = { byId: {}, all: [] };

const transactionReducer = (state = initialState, action) => {

  switch (action.type) {

    case LOAD_TRANSACTIONS: {
      const newState = { byId: { }, all: [ ] };
      for (let i = 0; i < action.transactions.length; i++) {
        let transaction = action.transactions[i];
        newState.byId[transaction.id] = transaction;
        transaction.trans_date = new Date(transaction.trans_date).toLocaleDateString()
        newState.all.push(transaction);
      }
      return newState;
    };
    case ADD_TRANSACTION: {
      const newState = { byId: { ...state.byId }, all: [ ...state.all] };
      const newTransaction = action.newTransaction;
      newTransaction.trans_date = new Date(newTransaction.trans_date).toLocaleDateString()
      newState.byId[newTransaction.id] = newTransaction;
      newState.all.push(newTransaction);
      return newState;
    };
    default:
      return state;
  };
};

export default transactionReducer;
