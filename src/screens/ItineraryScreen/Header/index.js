import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo';

import textStyle from '@/StyleSheets/text';
import { hour, secondsToMinutesF } from '@/utils/time';
import LegType from '@/components/LegType';
import { black, white } from '@/utils/colors';

export default class ItineraryScreen extends Component {
  render() {
    const { itinerary: i, isSelected } = this.props;

    return (
      <LinearGradient
        colors={isSelected ? ['#83EAF1', '#63A4FF'] : ['#FFF', '#FFF']}
        start={{ x: 0, y: 0.6 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          shadowColor: '#cecece',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 8,
          borderRadius: 8,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 0,
        }}>
        <View style={styles.container}>
          <View
            style={{
              alignContent: 'center',
              marginRight: 8,
            }}>
            <Text style={textStyle.black}>Départ à</Text>
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
              <Text style={{ color: white }}>{hour(i.endTime)}</Text>
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
                  {leg.to.name !== leg.from.name && (
                    <Fragment>
                      <LegType leg={leg} compact={i.legs.length > 4} />
                      {index !== i.legs.length - 1 && <Text style={{ color: black }}>{' > '}</Text>}
                    </Fragment>
                  )}
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
    padding: 16,
    paddingLeft: 8,
    paddingRight: 8,
  },
});
