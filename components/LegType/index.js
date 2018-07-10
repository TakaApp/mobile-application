import React, { Component } from 'react';
import T from 'prop-types';

import { View, Text, Image } from 'react-native';

const imageStyle = {
  resizeMode: 'contain',
  height: 20,
  width: 20,
};

const modeToDisplay = type => {
  switch (type) {
    case 'WALK':
      return <Image source={require('../../assets/images/walk.png')} style={imageStyle} />;
    case 'BUS':
      return <Image source={require('../../assets/images/bus.png')} style={imageStyle} />;
    case 'TRAM':
      return <Image source={require('../../assets/images/tram.png')} style={imageStyle} />;
    default:
      return <Text style={{ padding: 4, flex: 1 }}>?</Text>;
  }
};

// Itinerary is a component that displays an itinerary
// with its different legs
class LegType extends Component {
  render() {
    const { leg: l } = this.props;
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        {modeToDisplay(l.mode)}

        {l.mode !== 'WALK' && (
          <Text
            style={{
              backgroundColor: `#${l.routeColor}`,
              textAlign: 'center',
              paddingLeft: 4,
              paddingRight: 4,
              marginLeft: 4,
            }}>
            {l.route}
          </Text>
        )}
        {l.mode === 'WALK' && (
          <Text
            style={{
              textAlign: 'left',
              color: '#424242',
              marginTop: 8,
            }}>
            {Math.round(l.duration / 60)}
          </Text>
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
