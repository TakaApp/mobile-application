import get from 'lodash/get';

export const getErrorMessage = state => get(state, 'error.message');
export const getHasError = state => get(state, 'error.error');
