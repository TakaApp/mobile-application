import React, { Component } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { Text } from 'react-native';

class Hour extends Component {
  render() {
    const { timestamp } = this.props;
    return <Text>{moment(timestamp).format('HH:mm')}</Text>;
  }
}

Hour.propTypes = {
  timestamp: T.oneOfType([T.string, T.number]).isRequired,
};

export default Hour;
