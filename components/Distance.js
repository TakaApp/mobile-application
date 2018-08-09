import React, { Component } from 'react';
import T from 'prop-types';

import { Text } from 'react-native';

class Distance extends Component {
  render() {
    const { distanceInMeters } = this.props;
    return <Text>{Math.round(distanceInMeters)}m</Text>;
  }
}

Distance.propTypes = {
  distanceInMeters: T.number.isRequired,
};

export default Distance;
