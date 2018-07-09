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
      <View style={{ marginBottom: 16 }}>
        <View style={{ display: 'flex', flexDirection: 'column' }}>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              {i.legs.map((leg, index) => (
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <LegType leg={leg} />
                  {index !== i.legs.length - 1 && <Text style={{ padding: 4 }}>{' > '}</Text>}
                </View>
              ))}
            </View>
            <View>
              <Text style={{ padding: 4 }}>{Math.round(i.duration / 60)} min ></Text>
            </View>
          </View>
        </View>
        <View>
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
