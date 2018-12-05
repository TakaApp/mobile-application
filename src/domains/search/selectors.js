import get from 'lodash/get';

export const getSearchParameters = state => get(state, 'search.parameters');
export const getResults = state => get(state, 'search.results', []);
export const getFormValues = state => get(state, 'search.form', {});
