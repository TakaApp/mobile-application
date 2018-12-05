import React from 'react';
import { View, Text } from 'react-native';

import Distance from '@/components/Distance';
import Place from '@/components/Place';
import LegStyle from '@/StyleSheets/Leg';

import LegDuration from './components/Duration';
import LegIllustration from './components/Illustration';

export default class WalkLeg extends React.Component {
  render() {
    const { leg, index } = this.props;

    if (leg.to.name === leg.from.name) return null;

    return (
      <View style={LegStyle.container}>
        {/* leg illustration */}
        <LegIllustration leg={leg} index={index} />
        {/* leg description */}
        <View style={LegStyle.description}>
          <View style={LegStyle.descriptionItem}>{index === 0 && <Place data={leg.from} />}</View>
          <View style={LegStyle.descriptionItem}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text>Marcher </Text>
              <Distance distanceInMeters={leg.distance} />
            </View>
            <LegDuration duration={leg.duration} />
          </View>
          <View style={LegStyle.destination}>
            <Place data={leg.to} />
          </View>
        </View>
      </View>
    );
  }
}
