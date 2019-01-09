import { put, takeLatest } from 'redux-saga/effects';

import { ERROR, DISMISS_ERROR } from './constants';

function* dismiss() {
  yield takeLatest([ERROR], function* f() {
    yield new Promise(resolve => setTimeout(resolve, 4000));
    yield put({ type: DISMISS_ERROR });
  });
}

export default [dismiss];
