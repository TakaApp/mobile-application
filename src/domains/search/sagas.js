import moment from 'moment';
import { select, put, takeLatest } from 'redux-saga/effects';

import NavigationService from '@/services/Navigation';

import { UPDATE_SEARCH_PARAMETERS, RECEIVED_RESULTS } from './constants';
import { getSearchParameters } from './selectors';

function* searchOnParameterChanges() {
  yield takeLatest([UPDATE_SEARCH_PARAMETERS], function* f(action) {
    console.log('ON UPDATE SEARCH PARAMS');
    console.log('ON UPDATE SEARCH PARAMS');
    console.log('ON UPDATE SEARCH PARAMS');
    console.log('ON UPDATE SEARCH PARAMS');
    console.log('ON UPDATE SEARCH PARAMS');
    console.log('ON UPDATE SEARCH PARAMS');
    const sp = yield select(getSearchParameters);
    // invalid parameters
    if (!sp.from || !sp.to) return;

    console.log('searching');

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
    } catch (e) {
      console.log('ERROR', e);
      yield put({ type: 'ERROR', payload: { error: true } });
    }
  });
}

function* onResultsChangePage() {
  yield takeLatest([RECEIVED_RESULTS], function* f() {
    NavigationService.navigate('Itinerary');
  });
}

export default [searchOnParameterChanges, onResultsChangePage];
