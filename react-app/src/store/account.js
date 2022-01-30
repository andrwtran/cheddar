const LOAD_ACCOUNTS = 'accounts/LOAD_ACCOUNTS';
const ADD_ACCOUNT = 'accounts/ADD_ACCOUNT';
const REMOVE_ACCOUNT = 'accounts/REMOVE_ACCOUNT';
const UPDATE_ACCOUNT = 'accounts/UPDATE_ACCOUNT';

const load = (accounts) => {
  return { type: LOAD_ACCOUNTS, accounts };
};

const add = (newAccount) => {
  return { type: ADD_ACCOUNT, newAccount };
};

const remove = (oldAccount) => {
  return { type: REMOVE_ACCOUNT, oldAccount};
};

const update = (account) => {
  return { type: UPDATE_ACCOUNT, account};
};

export const getAccounts = () => async (dispatch) => {
  const response = await fetch('/api/accounts/');

  if (response.ok) {
    const accounts = await response.json();
    dispatch(load(accounts.all_accounts));
    return accounts;
  };
};

export const createAccount = (newAccount) => async (dispatch) => {
  const response = await fetch(`/api/accounts/`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newAccount)
  });
  const account = await response.json();

  if (response.ok) {
    dispatch(add(account));
    return account;
  };
};

export const deleteAccount = (oldAccount) => async (dispatch) => {
  const response = await fetch(`/api/accounts/${oldAccount.id}`, {
    method: 'delete'
  });

  if (response.ok) {
    const account = await response.json();
    dispatch(remove(account));
  };
};

export const updateAccount = (data) => async (dispatch) => {
  const response = await fetch(`/api/accounts/${data.id}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    const account = await response.json();
    dispatch(update(account));
    return account;
  }
}

const initialState = { byId: {}, all: [] };

const accountReducer = (state = initialState, action) => {

  switch (action.type) {

    case LOAD_ACCOUNTS: {
      const newState = { byId: { }, all: [ ] };
      for (let i = 0; i < action.accounts.length; i++) {
        let account = action.accounts[i];
        newState.byId[account.id] = account;
        newState.all.push(account);
      };
      return newState;
    };
    case ADD_ACCOUNT: {
      const newState = { byId: { ...state.byId }, all: [ ...state.all] };
      const newAccount = action.newAccount;
      if (!newState.byId[newAccount.id]) {
        newState.byId[newAccount.id] = newAccount;
        newState.all.push(newAccount);
      };
      return newState;
    };
    case REMOVE_ACCOUNT: {
      const newState = { byId: { ...state.byId }, all: [ ...state.all] };
      delete newState.byId[action.oldAccount.id];
      const removeIndex = newState.all.findIndex((account) => account.id === action.oldAccount.id);
      newState.all.splice(removeIndex, 1);
      return newState;
    };
    case UPDATE_ACCOUNT: {
      const newState = { byId: { ...state.byId }, all: [ ...state.all] };
      const editAccount = action.account;
      newState.byId[editAccount.id] = editAccount;
      const updateIndex = newState.all.findIndex((account) => account.id === editAccount.id);
      newState.all[updateIndex] = editAccount;
      return newState;
    };
    default:
      return state;
  };

};

export default accountReducer;
