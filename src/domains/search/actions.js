import { createAction } from 'redux-actions';
import { UPDATE_SEARCH_PARAMETERS, UPDATE_FORM_VALUE } from './constants';

export const updateSearchParameters = createAction(UPDATE_SEARCH_PARAMETERS);
export const updateFormValue = createAction(UPDATE_FORM_VALUE);
