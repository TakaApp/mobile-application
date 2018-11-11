import React from 'react';

import { View, Text } from 'react-native';
import Duration from '../../../../components/Duration';

const LegDuration = ({ duration }) => (
  <View>
    <Text style={{ color: '#1e88e5' }}>
      <Duration durationInSeconds={duration} />
    </Text>
  </View>
);

export default LegDuration;
