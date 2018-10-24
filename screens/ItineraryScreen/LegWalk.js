import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import Hour from '../../components/Hour';
import Distance from '../../components/Distance';
import Duration from '../../components/Duration';
import Place from '../../components/Place';

import LegStyle from '../../StyleSheets/Leg';
import LegType from '../../components/LegType';

export default class WalkLeg extends React.Component {
  render() {
    const { leg, index } = this.props;

    if (leg.to.name === leg.from.name) return null;

    return (
      <View style={LegStyle.container}>
        {/* leg illustration */}
        <View style={LegStyle.illustration}>
          <View class="start-time">{index === 0 && <Hour timestamp={leg.startTime} />}</View>
          <LegType leg={leg} />
          <View style={styles.line}>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.dot}>•</Text>
          </View>
          <Text style={styles.endTime}>
            <Hour timestamp={leg.endTime} />
          </Text>
        </View>
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
  line: {
    minHeight: 82,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
