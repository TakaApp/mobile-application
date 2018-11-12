import React from 'react';
import { View, Text } from 'react-native';

import Duration from '@/components/Duration';
import { blue } from '@/utils/colors';

const LegDuration = ({ duration }) => (
  <View>
    <Text style={{ color: blue }}>
      <Duration durationInSeconds={duration} />
    </Text>
  </View>
);

export default LegDuration;
