const LOAD_TRANSACTIONS = 'transactions/LOAD_TRANSACTIONS';
const ADD_TRANSACTION = 'transactions/ADD_TRANSACTION';
const REMOVE_TRANSACTION = 'transactions/REMOVE_TRANSACTION';
const UPDATE_TRANSACTION = 'transactions/UPDATE_TRANSACTION';

const load = (transactions) => {
  return { type: LOAD_TRANSACTIONS, transactions };
};

const add = (newTransaction) => {
  return { type: ADD_TRANSACTION, newTransaction };
};

const remove = (oldTransaction) => {
  return { type: REMOVE_TRANSACTION, oldTransaction};
};

const update = (transaction) => {
  return { type: UPDATE_TRANSACTION, transaction};
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

export const deleteTransaction = (oldTransaction) => async (dispatch) => {
  const response = await fetch(`/api/transactions/${oldTransaction.id}`, {
    method: 'delete'
  });

  if (response.ok) {
    const transaction = await response.json();
    dispatch(remove(transaction));
  };
};

export const updateTransaction = (data) => async (dispatch) => {
  const response = await fetch(`/api/transactions/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const transaction = await response.json();
    dispatch(update(transaction));
    return transaction;
  }
}

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
    case REMOVE_TRANSACTION: {
      const newState = { byId: { ...state.byId }, all: [ ...state.all] };
      delete newState.byId[action.oldTransaction.id];
      const removeIndex = newState.all.findIndex((transaction) => transaction.id === action.oldTransaction.id);
      newState.all.splice(removeIndex, 1);
      return newState;
    };
    case UPDATE_TRANSACTION: {
      const newState = { byId: { ...state.byId }, all: [ ...state.all] };
      const editTransaction = action.transaction;
      editTransaction.trans_date = new Date(editTransaction.trans_date).toLocaleDateString()
      newState.byId[editTransaction.id] = editTransaction;
      const updateIndex = newState.all.findIndex((transaction) => transaction.id === editTransaction.id);
      newState.all[updateIndex] = editTransaction;
      return newState;
    };
    default:
      return state;
  };

};

export default transactionReducer;
