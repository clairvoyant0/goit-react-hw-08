// --------------- Selector`s functions
export const selectAuthUser = state => {
  return state.auth.user;
};

export const selectAuthToken = state => {
    return state.auth.token;
}
export const selectAuthIsLoggedIn = state => {
    return state.auth.isLoggedIn;
}

export const selectAuthIsRefreshing = state => {
  return state.auth.isRefreshing;
};

export const selectAuthError = state => {
  return state.auth.error;
};