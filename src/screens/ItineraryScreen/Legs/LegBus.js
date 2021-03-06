import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import Hour from '@/components/Hour';
import Place from '@/components/Place';
import LegStyle from '@/StyleSheets/Leg';

import LegDuration from './components/Duration';
import LegIllustration from './components/Illustration';
import StopDetails from './components/StopDetails';

class BusLeg extends React.Component {
  render() {
    const { leg, index, stopDetails } = this.props;

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
            <StopDetails stopDetails={stopDetails} />
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

BusLeg.defaultProps = {
  stopDetails: [],
};

export default BusLeg;
