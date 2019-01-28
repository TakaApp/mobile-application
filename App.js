import React from 'react';
import Sentry from 'sentry-expo';

import { Provider } from 'react-redux';

import App from './src/App';
import store from './src/store';

Sentry.enableInExpoDevelopment = true;

Sentry.config('https://e62dd7e9d90245a1a149905445fdad8b@sentry.io/1381539').install();

export default class RootComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
