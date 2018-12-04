import { combineReducers } from 'redux';

import * as search from '@/domains/search/reducer';

const rootReducer = combineReducers({
  ...search,
});

export default rootReducer;
