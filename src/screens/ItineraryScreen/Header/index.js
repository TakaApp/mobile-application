import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { hour, secondsToMinutesF } from '@/utils/time';
import LegType from '@/components/LegType';

export default class ItineraryScreen extends Component {
  render() {
    const { itinerary: i } = this.props;

    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          backgroundColor: '#000',
          paddingTop: 16,
          paddingBottom: 16,
        }}>
        <View
          style={{
            alignContent: 'center',
            paddingLeft: 8,
            paddingRight: 8,
          }}>
          <Text style={{ color: '#FFF' }}>Depart à</Text>
          <Text style={styles.departureTime}>{hour(i.startTime)}</Text>
        </View>
        <View>
          <Text style={{ flex: 1, padding: 4, color: '#FFF' }}>
            Durée: {secondsToMinutesF(i.duration)} ·{' '}
            <Text style={{ color: '#1e88e5' }}>{hour(i.endTime)}</Text>
          </Text>
          <View
            style={{
              flex: 4,
              display: 'flex',
              flexDirection: 'row',
            }}>
            {/* Legs Walk > Bus > Walk ... */}
            {i.legs.map((leg, index) => (
              <View
                key={index}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <LegType leg={leg} />
                {index !== i.legs.length - 1 && <Text style={{ color: '#CCCCCC' }}>{' > '}</Text>}
              </View>
            ))}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  departureTime: {
    fontSize: 32,
    color: '#FFF',
  },
});