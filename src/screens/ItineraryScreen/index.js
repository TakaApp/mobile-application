import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import moment from 'moment';

import LegType from '../../components/LegType';

import LegWalk from './Legs/LegWalk';
import LegTram from './Legs/LegTram';
import LegBus from './Legs/LegBus';

export default class ItineraryScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const i = navigation.getParam('itinerary', {});

    console.log('i', i);

    return (
      <ScrollView style={styles.container}>
        <View>
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
              <Text style={styles.departureTime}>{moment(i.startTime).format('HH:mm')}</Text>
            </View>
            <View>
              <Text style={{ flex: 1, padding: 4, color: '#FFF' }}>
                Durée: {Math.round(i.duration / 60)} min ·{' '}
                <Text style={{ color: '#1e88e5' }}>{moment(i.endTime).format('HH:mm')}</Text>
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
                    {index !== i.legs.length - 1 && (
                      <Text style={{ color: '#CCCCCC' }}>{' > '}</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          </View>
          {/* Leg details */}
          <View>
            {i.legs.map((leg, index) => (
              <View key={index}>
                {leg.mode === 'WALK' && <LegWalk leg={leg} index={index} />}
                {leg.mode === 'TRAM' && <LegTram leg={leg} index={index} />}
                {leg.mode === 'BUS' && <LegBus leg={leg} index={index} />}
              </View>
            ))}
          </View>
          !{' '}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  departureTime: {
    fontSize: 32,
    color: '#FFF',
  },
});
