import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import LegStyle from 'src/StyleSheets/Leg';

import Hour from 'src/components/Hour';
import LegType from 'src/components/LegType';

const LegIllustration = ({ leg, index }) => {
  let content;

  if (leg.mode === 'WALK') {
    content = (
      <View>
        <Text>•</Text>
        <Text>•</Text>
        <Text>•</Text>
      </View>
    );
  } else {
    content = <View style={styles.line} />;
  }

  return (
    <View style={LegStyle.illustration}>
      <View class="start-time">{index === 0 && <Hour timestamp={leg.startTime} />}</View>
      <LegType leg={leg} />
      {content}
      <Hour timestamp={leg.endTime} />
    </View>
  );
};

export default LegIllustration;

const styles = StyleSheet.create({
  line: {
    borderRightColor: '#000000',
    borderRightWidth: 2,
    flexGrow: 1,
    flexShrink: 0,
    minHeight: 64,
  },
});
