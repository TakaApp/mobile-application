import { handleActions } from 'redux-actions';
import get from 'lodash/get';

import {
  UPDATE_SEARCH_PARAMETERS,
  RECEIVED_RESULTS,
  UPDATE_FORM_VALUE,
  SET_IS_LOADING,
} from './constants';

const initialState = {
  parameters: {
    // Objects of this shape
    // {
    //    lat: float
    //    lng: float
    //    name: string
    // }
    from: null,
    to: null,

    date: new Date(),
    arriveBy: false,

    // for dev purposes
    // from: {
    //   lat: 47.2128,
    //   lng: -1.5625,
    //   name: 'Place Graslin',
    // },
    // to: {
    //   lat: 47.2077,
    //   lng: -1.5369,
    //   name: 'v Rue René Viviani',
    // },
  },
  form: {
    fromText: '',
    toText: '',
  },
  loading: false,
  history: [],
};

export const search = handleActions(
  {
    [UPDATE_SEARCH_PARAMETERS]: (state, action) => {
      const from = get(action, 'payload.from', {});
      const to = get(action, 'payload.to', {});
      const oldHistory = get(state, 'history', []);
      const newHistory = [...oldHistory];

      if (from.name && from.name !== 'Mon emplacement') {
        newHistory.push({ ...from });
      }
      if (to.name && to.name !== 'Mon emplacement') {
        newHistory.push({ ...to });
      }
      while (newHistory.length > 5) newHistory.pop();

      return {
        ...state,
        history: newHistory,
        parameters: {
          ...state.parameters,
          ...action.payload,
        },
      };
    },
    [RECEIVED_RESULTS]: (state, action) => ({
      ...state,
      results: action.payload,
      loading: false,
    }),
    [UPDATE_FORM_VALUE]: (state, action) => ({
      ...state,
      form: {
        ...state.form,
        ...action.payload,
      },
    }),
    [SET_IS_LOADING]: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
  },
  initialState
);
