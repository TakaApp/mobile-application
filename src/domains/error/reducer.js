import Sentry from 'sentry-expo';

import { handleActions } from 'redux-actions';

import { ERROR, DISMISS_ERROR } from './constants';

const initialState = {
  error: false,
  message: null,
};

export const error = handleActions(
  {
    [ERROR]: (state, action) => {
      Sentry.captureMessage(action.payload);

      return {
        ...state,
        message: action.payload,
        error: true,
      };
    },
    [DISMISS_ERROR]: state => ({
      ...state,
      ...initialState,
    }),
  },
  initialState
);
