import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import Hour from '../../components/Hour';
import Distance from '../../components/Distance';
import Duration from '../../components/Duration';
import Place from '../../components/Place';

import LegStyle from '../../StyleSheets/Leg';

export default class WalkLeg extends React.Component {
  render() {
    const { leg, index } = this.props;
    return (
      <View style={LegStyle.container}>
        {/* leg illustration */}
        <View style={LegStyle.illustration}>
          {index === 0 && (
            <View class="start-time">
              <Hour timestamp={leg.startTime} />
            </View>
          )}
          <Image source={require('../../assets/images/walk.png')} style={styles.icon} />
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
            {index === 0 && (
              <View>
                <Place data={leg.from} />
              </View>
            )}
          </View>
          <View style={LegStyle.descriptionItem}>
            <View>
              Marcher <Distance distanceInMeters={leg.distance} />
            </View>
            <View>
              <Duration durationInSeconds={leg.duration} />
            </View>
          </View>
          <View style={LegStyle.descriptionItem}>
            <View>
              <Place data={leg.to} />
            </View>
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
});
