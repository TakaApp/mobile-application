import React, { Component } from 'react';
import T from 'prop-types';

import { Text } from 'react-native';

class Duration extends Component {
  duration = durationInSeconds => {
    const date = new Date(null);
    date.setSeconds(durationInSeconds);
    if (durationInSeconds <= 60) {
      return `${durationInSeconds}s`;
    }
    if (durationInSeconds <= 60 * 59) {
      return `${date.toISOString().substr(14, 2)}min`;
    }
    return `${date.toISOString().substr(11, 5)}min`;
  };

  render() {
    const { durationInSeconds } = this.props;
    return <Text>{this.duration(durationInSeconds)}</Text>;
  }
}

Duration.propTypes = {
  durationInSeconds: T.number.isRequired,
};

export default Duration;
