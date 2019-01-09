import { combineReducers } from 'redux';

import * as search from '@/domains/search/reducer';
import * as error from '@/domains/error/reducer';

function logger(state = {}, action) {
  console.log('action', action.type);
  return state;
}

const rootReducer = combineReducers({
  ...search,
  ...error,
  logger,
});

export default rootReducer;
