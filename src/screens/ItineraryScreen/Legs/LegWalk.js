import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Hour from '../../../components/Hour';
import Distance from '../../../components/Distance';
import Place from '../../../components/Place';

import LegStyle from '../../../StyleSheets/Leg';

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
          <View style={LegStyle.descriptionItem}>
            <View>{index === 0 ? <Place data={leg.from} /> : <Text />}</View>
          </View>
          <View style={LegStyle.descriptionItem}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text>Marcher </Text>
              <Distance distanceInMeters={leg.distance} />
            </View>
            <LegDuration duration={leg.duration} />
          </View>
          <View style={LegStyle.destination}>
            <View style={{ alignSelf: 'flex-end' }}>
              <Place data={leg.to} />
            </View>>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  line: {
    minHeight: 82,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
