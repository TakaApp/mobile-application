import { handleActions } from 'redux-actions';

import { UPDATE_SEARCH_PARAMETERS, RECEIVED_RESULTS } from './constants';

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
    from: {
      lat: 47.2128,
      lng: -1.5625,
      name: 'Place Graslin',
    },
    to: {
      lat: 47.2077,
      lng: -1.5369,
      name: 'v Rue René Viviani',
    },
  },
};

export const search = handleActions(
  {
    [UPDATE_SEARCH_PARAMETERS]: (state, action) => ({
      ...state,
      parameters: {
        ...state.parameters,
        ...action.payload,
      },
    }),
    [RECEIVED_RESULTS]: (state, action) => ({
      ...state,
      results: action.payload,
    }),
  },
  initialState
);
