import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import Hour from '../../components/Hour';
import Duration from '../../components/Duration';
import Place from '../../components/Place';

import LegStyle from '../../StyleSheets/Leg';
import LegType from '../../components/LegType';

export default class BugLeg extends React.Component {
  render() {
    const { leg } = this.props;

    console.log('leg', leg);

    return (
      <View style={LegStyle.container}>
        {/* leg illustration */}
        <View style={LegStyle.illustration}>
          <LegType leg={leg} />
          <Text style={styles.dot}>•</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.dot}>•</Text>
          <Text style={styles.endTime}>
            <Hour timestamp={leg.endTime} />
          </Text>
        </View>
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
            <View>
              <Duration durationInSeconds={leg.duration} />
            </View>
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
  dot: {},
  icon: {
    resizeMode: 'contain',
    height: 20,
    width: 20,
  },
  endTime: {},
  nextDepartures: {
    flexDirection: 'row',
  },
});
