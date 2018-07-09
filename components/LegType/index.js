import React, { Component } from 'react';
import T from 'prop-types';

import { View, Text } from 'react-native';

const modeToDisplay = type => {
  switch (type) {
    case 'WALK':
      return 'M';
    case 'BUS':
      return 'B';
    case 'TRAM':
      return 'T';
    default:
      return '?';
  }
};

// Itinerary is a component that displays an itinerary
// with its different legs
class LegType extends Component {
  render() {
    const { leg: l } = this.props;
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <Text style={{ padding: 4 }}>{modeToDisplay(l.mode)}</Text>
        {l.mode !== 'WALK' && (
          <Text style={{ backgroundColor: `#${l.routeColor}`, padding: 4 }}>{l.route}</Text>
        )}
      </View>
    );
  }
}

LegType.propTypes = {
  leg: T.shape({
    // For transit legs, the type of the route.
    //  - Non transit -1
    //  - When 0-7:
    //    - 0 Tram
    //    - 1 Subway
    //    - 2 Train
    //    - 3 Bus
    //    - 4 Ferry
    //    - 5 Cable Car
    //    - 6 Gondola
    //    - 7 Funicular
    //  - When equal or highter than 100:
    //    it is coded using the Hierarchical Vehicle Type (HVT)
    //    codes from the European TPEG standard
    routeType: T.number.isRequired,

    // For transit leg:
    //  - the route's (background) color (if one exists)
    // For non-transit legs
    //  - null.
    routeColor: T.string,

    // For transit leg:
    //  - the route's text color (if one exists)
    // For non-transit legs
    //  - null.
    routeTextcolor: T.string,

    // The mode used when traversing this leg.
    // ex: BUS, WALK
    mode: T.string.isRequired,

    // For transit legs:
    //  - the route of the bus or train being used
    // For non-transit legs
    //  - the name of the street being traversed.
    // ex: 4, eq Line 4
    route: T.string.isRequired,
  }),
};

export default LegType;
