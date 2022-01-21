const LOAD_ACCOUNTS = 'accounts/LOAD_ACCOUNTS';
const ADD_ACCOUNT = 'accounts/ADD_ACCOUNT';

const load = (accounts) => {
  return { type: LOAD_ACCOUNTS, accounts }
}

const add = (newAccount) => {
  return { type: ADD_ACCOUNT, newAccount }
}

export const getAccounts = () => async (dispatch) => {
  const response = await fetch('/api/accounts/')

  if (response.ok) {
    const accounts = await response.json();
    dispatch(load(accounts.all_accounts));
    return accounts;
  }
}

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
  }
};

const initialState = { byId: {}, all: [] };

const accountReducer = (state = initialState, action) => {

  switch (action.type) {

    case LOAD_ACCOUNTS: {
      const newState = { ...state, byId: { ...state.byId }, all: [ ...state.all] };
      for (let i = 0; i < action.accounts.length; i++) {
        let account = action.accounts[i];
        newState.byId[account.id] = account;
        newState.all.push(account);
      }
      return newState;
    };
    case ADD_ACCOUNT: {
      const newState = { ...state, byId: { ...state.byId }, all: [ ...state.all] };
      const newAccount = action.newAccount;
      newState.byId[newAccount.id] = newAccount;
      newState.all.push(newAccount);
      return newState;
    };
    default:
      return state;
  };
};

export default accountReducer;
