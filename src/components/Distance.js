import React from 'react';
import T from 'prop-types';

import { Text } from 'react-native';

const Distance = ({ distanceInMeters }) => <Text>{Math.round(distanceInMeters)}m</Text>;

Distance.propTypes = {
  distanceInMeters: T.number.isRequired,
};

export default Distance;
