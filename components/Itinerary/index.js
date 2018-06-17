import React, { Component } from 'react';
import T from 'prop-types';

import { View, Text } from 'react-native';

// Itinerary is a component that displays an itinerary
// with its different legs
class Itinerary extends Component {
  state = {
    open: false,
  };

  render() {
    const { itinerary: i } = this.props;
    return (
      <View>
        <Text>{Math.round(i.duration / 60)} minutes de trajet</Text>
      </View>
    );
  }
}

Itinerary.propTypes = {
  /* functions */
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
