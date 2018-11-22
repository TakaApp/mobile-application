import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo';

import textStyle from '@/StyleSheets/text';
import { hour, secondsToMinutesF } from '@/utils/time';
import LegType from '@/components/LegType';
import { black, white, blue } from '@/utils/colors';

export default class ItineraryScreen extends Component {
  render() {
    const { itinerary: i, isSelected } = this.props;

    return (
      <LinearGradient
        colors={isSelected ? ['#9795EF', '#F9C5D1'] : ['#F5E3E6', '#D9E4F5']}
        style={{
          alignItems: 'center', borderRadius: 5, shadowColor: '#dddddd',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 2,
        }}
      >
        <View style={styles.container}>
          <View
            style={{
              alignContent: 'center',
              marginRight: 8,
            }}>
            <Text style={textStyle.black}>Depart à</Text>
            <Text style={styles.departureTime}>{hour(i.startTime)}</Text>
          </View>
          <View style={{ flexGrow: 1 }}>
            <View style={{ flexGrow: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
              <Text
                style={{
                  flex: 1,
                  color: black,
                  fontWeight: 'bold',
                }}>
                Durée: {secondsToMinutesF(i.duration)}
              </Text>
              <Text style={{ color: blue }}>{hour(i.endTime)}</Text>
            </View>
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
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  departureTime: {
    fontSize: 32,
    color: black,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    padding: 8,
  },
});
