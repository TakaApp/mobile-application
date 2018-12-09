import { createAction } from 'redux-actions';
import { ERROR } from './constants';

export const putError = createAction(ERROR);
