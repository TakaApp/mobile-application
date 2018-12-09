import { combineReducers } from 'redux';

import * as search from '@/domains/search/reducer';

function todoApp(state, action) {
  console.log('action', action.type);
  if (typeof state === 'undefined') {
    return {};
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state;
}

const rootReducer = combineReducers({
  ...search,
  todoApp,
});

export default rootReducer;
