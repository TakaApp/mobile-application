import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import textStyle from '@/StyleSheets/text';
import { hour, secondsToMinutesF } from '@/utils/time';
import LegType from '@/components/LegType';
import { black, white, blue } from '@/utils/colors';

export default class ItineraryScreen extends Component {
  render() {
    const { itinerary: i, isSelected } = this.props;

    return (
      <View style={isSelected ? styles.selectedContainer : styles.notSelectedContainer}>
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
    );
  }
}

const styles = StyleSheet.create({
  departureTime: {
    fontSize: 32,
    color: black,
  },
  notSelectedContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 8,

    borderWidth: 1,
    borderRadius: 4,
    borderColor: white,
    borderBottomWidth: 0,
    shadowColor: '#bdbdbd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  selectedContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 8,
  },
});
