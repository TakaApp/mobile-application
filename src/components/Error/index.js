import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, Text } from 'react-native';
import { Constants } from 'expo';

import { getErrorMessage, getHasError } from '@/domains/error/selectors';
import { red } from '@/utils/colors';

class Error extends Component {
  render() {
    const { error, message } = this.props;

    if (!error) return null;

    return (
      <View
        style={{
          position: 'fixed',
          zIndex: 999,
          backgroundColor: red,
          padding: 8,
          marginTop: Constants.statusBarHeight,
        }}>
        <Text>{message}</Text>
      </View>
    );
  }
}

Error.propTypes = {};

export default connect(state => ({
  error: getHasError(state),
  message: getErrorMessage(state),
}))(Error);
