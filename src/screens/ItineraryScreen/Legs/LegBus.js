import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Hour from '@/components/Hour';
import Place from '@/components/Place';
import LegStyle from '@/StyleSheets/Leg';

import LegDuration from './components/Duration';
import LegIllustration from './components/Illustration';

export default class BugLeg extends React.Component {
  render() {
    const { leg, index } = this.props;

    return (
      <View style={LegStyle.container}>
        <LegIllustration leg={leg} index={index} />
        {/* leg description */}
        <View style={LegStyle.description}>
          <View style={LegStyle.descriptionItem}>
            <View>
              <Text>> {leg.headSign}</Text>
              <View style={styles.nextDepartures}>
                <Text style={{ fontSize: 12 }}>
                  <Text>Prochains départs: </Text>
                  <Hour timestamp={leg.startTime} />
                </Text>
              </View>
            </View>
          </View>
          <View style={LegStyle.descriptionItem}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <Text>
                {leg.legGeometry.length} arrêt{leg.legGeometry.length > 1 ? 's' : ''}{' '}
              </Text>
            </View>
            <LegDuration duration={leg.duration} />
          </View>
          <View style={LegStyle.destination}>
            <View style={{ alignSelf: 'flex-end' }}>
              <Place data={leg.to} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  nextDepartures: {
    flexDirection: 'row',
  },
});
