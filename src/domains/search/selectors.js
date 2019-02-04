import get from 'lodash/get';

export const getSearchParameters = state => get(state, 'search.parameters');
export const getResults = state => get(state, 'search.results', []);
export const getFormValues = state => get(state, 'search.form', {});
export const getIsLoading = state => get(state, 'search.loading', false);
export const getHistory = state => get(state, 'search.history', []);
