import { createAction } from 'redux-actions';
import { UPDATE_SEARCH_PARAMETERS, UPDATE_FORM_VALUE, SEARCH, SET_IS_LOADING } from './constants';

export const updateSearchParameters = createAction(UPDATE_SEARCH_PARAMETERS);
export const updateFormValue = createAction(UPDATE_FORM_VALUE);
export const search = createAction(SEARCH);
export const setIsLoading = createAction(SET_IS_LOADING);
