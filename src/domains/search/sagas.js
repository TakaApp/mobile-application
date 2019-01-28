import moment from 'moment';
import { Permissions } from 'expo';
import Sentry from 'sentry-expo';

import { select, put, takeLatest } from 'redux-saga/effects';

import NavigationService from '@/services/Navigation';
import { event } from '@/services/Analytics';

import { UPDATE_SEARCH_PARAMETERS, RECEIVED_RESULTS, SET_IS_LOADING } from './constants';
import { getSearchParameters } from './selectors';

function* searchOnParameterChanges() {
  yield takeLatest([UPDATE_SEARCH_PARAMETERS], function* f(action) {
    const sp = yield select(getSearchParameters);
    let { status } = yield Permissions.askAsync(Permissions.LOCATION);

    // invalid parameters
    if ((!sp.from || !sp.to) && status === 'granted' && !action.payload.changeScreen) return;

    if (!sp.from || !sp.to) return;

    yield put({ type: SET_IS_LOADING, payload: true });
    try {
      const response = yield fetch('https://api.nantes.cool/trip', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          arriveBy: sp.arriveBy ? 'true' : 'false',
          time: moment(sp.date).format('HH:mm'),
          date: moment(sp.date).format('MM-DD-YYYY'),
          from: `${sp.from.lat},${sp.from.lng}`,
          to: `${sp.to.lat},${sp.to.lng}`,
        }),
      });
      const data = yield response.json();
      const results = data.plan.itineraries || [];

      // on force l'addresse dans le formulaire
      yield put({ type: RECEIVED_RESULTS, payload: results });
      event('search', 'received', 'itinerary-results', results.length);
    } catch (e) {
      event('search', 'received', 'error');
      Sentry.captureMessage(
        `Failed to search with: ${JSON.stringify({
          arriveBy: sp.arriveBy ? 'true' : 'false',
          time: moment(sp.date).format('HH:mm'),
          date: moment(sp.date).format('MM-DD-YYYY'),
          from: `${sp.from.lat},${sp.from.lng}`,
          to: `${sp.to.lat},${sp.to.lng}`,
        })}`
      );
      yield put({ type: SET_IS_LOADING, payload: false });
      yield put({ type: RECEIVED_RESULTS, payload: [] });
      yield put({ type: 'ERROR', payload: `Le serveur a quelques problèmes... (ง'̀-'́)ง` });
    }
  });
}

function* onResultsChangePage() {
  yield takeLatest([RECEIVED_RESULTS], function* f() {
    NavigationService.navigate('Results');
  });
}

export default [searchOnParameterChanges, onResultsChangePage];
