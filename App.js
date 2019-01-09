import React from 'react';
import App from './src/App';

import store from './src/store';

import { Provider } from 'react-redux';

export default class RootComponent extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
