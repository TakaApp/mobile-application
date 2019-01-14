import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import polyUtil from 'polyline-encoded';

import { Marker, Polyline } from 'react-native-maps';
import { Constants, MapView } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import { notTotallyWhite, black, red, blue } from '@/utils/colors';
import { getResults, getSearchParameters } from '@/domains/search/selectors';

import LegFactory from './Legs/LegFactory';
import Header from './Header';

const buildPolyLines = (itinerary, resultId = 0) => {
  const trips = [];
  const isActive = true;
  const combinedPolyLines = itinerary.legs.map((leg, index) => {
    const latlngs = polyUtil.decode(leg.legGeometry.points);
    // eslint-disable-next-line
    const color = leg.mode === 'WALK' ? '#3367D6' : leg.routeColor ? `#${leg.routeColor}` : 'green';
    const dashArray = leg.mode === 'WALK' ? [1, 12] : null;

    return [
      // outline
      {
        id: `${leg.routeId}${index}${resultId}-outline`,
        width: 10,
        color: '#424242',
        dashArray,
        latlngs: latlngs.map(ll => ({ latitude: ll[0], longitude: ll[1] })),
        resultId,
      },
      // main polyline
      {
        id: `${leg.routeId}${index}${resultId}`,
        width: 9,
        color: isActive ? color : '#cccccc',
        dashArray,
        latlngs: latlngs.map(ll => ({ latitude: ll[0], longitude: ll[1] })),
        resultId,
      },
    ];
  });
  combinedPolyLines.forEach(polyLines => {
    trips.push({
      active: isActive,
      polyLines,
    });
  });

  return trips.sort(i => i.active);
};

class ItineraryScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidUpdate(prevProps) {
    this.map.fitToElements();
  }

  render() {
    const { searchParameters, itinerary, trips } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={32} color={black} />
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              backgroundColor: '#FFF',
            }}>
            <View style={styles.map}>
              <MapView
                ref={c => {
                  this.map = c;
                }}
                onLayout={() => this.map.fitToElements(true)}
                style={{ flexGrow: 1 }}
                initialRegion={{
                  latitude: 47.209136,
                  longitude: -1.547149,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                showsUserLocation>
                {trips.map((trip, index) => {
                  return (
                    <React.Fragment key={index}>
                      {trip.polyLines.map(step => (
                        <Polyline
                          key={step.id}
                          coordinates={step.latlngs}
                          strokeWidth={step.width}
                          strokeColor={step.color}
                          lineDashPattern={step.dashArray}
                        />
                      ))}
                    </React.Fragment>
                  );
                })}
                <Marker
                  identifier="From"
                  flat
                  pinColor={red}
                  coordinate={{
                    latitude: searchParameters.from.lat,
                    longitude: searchParameters.from.lng,
                  }}
                />
                <Marker
                  identifier="To"
                  flat
                  pinColor={blue}
                  coordinate={{
                    latitude: searchParameters.to.lat,
                    longitude: searchParameters.to.lng,
                  }}
                />
              </MapView>
            </View>
          </View>
          <Header itinerary={itinerary} isSelected />
        </View>
        <ScrollView>
          <View style={styles.legs}>{itinerary.legs.map(LegFactory.build)}</View>
        </ScrollView>
      </View>
    );
  }
}

export default connect((state, { navigation }) => ({
  itinerary: getResults(state)[navigation.getParam('selected')],
  searchParameters: getSearchParameters(state),
  trips: buildPolyLines(getResults(state)[navigation.getParam('selected')]),
}))(ItineraryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: notTotallyWhite,
  },
  map: {
    flexGrow: 1,
    height: 256,
  },
  header: {
    backgroundColor: black,
    padding: 16,
    paddingTop: Constants.statusBarHeight + 16,
    paddingLeft: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#888888',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  loading: {
    marginBottom: 16,
  },
  legs: {
    backgroundColor: '#FFF',
    shadowColor: '#888888',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  backButton: {
    zIndex: 2,
    position: 'absolute',
    left: 16,
    top: 16 + Constants.statusBarHeight,
    shadowColor: '#888888',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
    borderRadius: 500,
    backgroundColor: '#FFF',
    paddingLeft: 10,
    paddingRight: 12,
    paddingTop: 2,
  },
});
