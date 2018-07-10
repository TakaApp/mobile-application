import React, { Component } from 'react';
import T from 'prop-types';
import moment from 'moment';

import { View, Text } from 'react-native';

import LegType from '../../components/LegType';

// Itinerary is a component that displays an itinerary
// with its different legs
class Itinerary extends Component {
  state = {
    open: false,
  };

  render() {
    const { itinerary: i } = this.props;
    return (
      <View
        style={{
          marginBottom: 8,
          paddingBottom: 8,
          borderBottomRadius: 4,
          borderBottomWidth: 0.5,
          borderBottomColor: '#CCCCCC',
        }}>
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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
            <Text style={{ flex: 1, padding: 4 }}>{Math.round(i.duration / 60)} min ></Text>
          </View>
        </View>
        <View style={{ marginTop: 8 }}>
          <Text>
            {moment(i.startTime).format('HH:mm')}
            {' - '}
            {moment(i.endTime).format('HH:mm')}
          </Text>
        </View>
      </View>
    );
  }
}

Itinerary.propTypes = {
  itinerary: T.shape({
    // duration <seconds>
    duration: T.number.isRequired,

    // startTime <timestamp>
    startTime: T.number.isRequired,
    // endTime <timestamp>
    endTime: T.number.isRequired,

    // legs <Leg>
    legs: T.array.isRequired,

    // transfers <int>
    transfers: T.number.isRequired,

    // transitTime <seconds>
    transitTime: T.number.isRequired,
    // waitingTime <seconds>
    waitingTime: T.number.isRequired,
    // walkDistance <meters>
    walkDistance: T.number.isRequired,
    // walkTime <seconds>
    walkTime: T.number.isRequired,
  }),
};

export default Itinerary;
