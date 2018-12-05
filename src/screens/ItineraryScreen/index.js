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

class ItineraryScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    loading: false,
    results: [],
    hasSearched: false,

    selected: -1,
    trips: [],
  };

  componentDidUpdate(prevProps) {
    this.map.fitToSuppliedMarkers(['From', 'To']);
  }

  toggleItinerary = index => () => {
    const { selected } = this.state;

    if (index === selected) {
      this.setState({ selected: -1 });
      return;
    }
    this.setState({ selected: index });
    const trips = [];
    // create poly line
    const result = this.props.results[index];
    const resultId = index;
    const isActive = true;
    const combinedPolyLines = result.legs.map((leg, index) => {
      const latlngs = polyUtil.decode(leg.legGeometry.points);
      // eslint-disable-next-line
      const color =
        leg.mode === 'WALK' ? '#3367D6' : leg.routeColor ? `#${leg.routeColor}` : 'green';
      const dashArray = leg.mode === 'WALK' ? [1, 12] : null;

      console.log('latlng', latlngs);

      return [
        // outline
        {
          id: `${leg.routeId}${index}${resultId}-outline`,
          weight: 10,
          color: '#424242',
          dashArray,
          latlngs: latlngs.map(ll => ({ latitude: ll[0], longitude: ll[1] })),
          resultId,
        },
        // main polyline
        {
          id: `${leg.routeId}${index}${resultId}`,
          weight: 9,
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

    this.setState({ trips: trips.sort(i => i.active) });
  };

  onItineraryResults = results => {
    this.setState({ results, hasSearched: true, loading: false });
  };

  render() {
    const { selected, trips } = this.state;
    const { results, searchParameters } = this.props;

    console.log('results', trips[0] ? trips[0].polyLines : null);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.goBack} onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={32} color="#FFF" />
          </TouchableOpacity>
          {selected !== -1 && <Header itinerary={results[selected]} isSelected />}
        </View>
        <ScrollView style={styles.container}>
          {results.map((result, index) => (
            <View
              key={index}
              style={{
                marginBottom: 8,
                paddingLeft: 8,
                paddingRight: 8,
                backgroundColor: '#FFF',
              }}>
              {selected !== index && (
                <TouchableOpacity onPress={this.toggleItinerary(index)}>
                  <Header itinerary={result} isSelected={selected === index} />
                </TouchableOpacity>
              )}
              {selected === index && (
                <View style={styles.map}>
                  <MapView
                    ref={c => {
                      this.map = c;
                    }}
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
                              strokeWidth={4}
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
              )}
              {selected === index && <View>{result.legs.map(LegFactory.build)}</View>}
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default connect(state => ({
  results: getResults(state),
  searchParameters: getSearchParameters(state),
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
    shadowColor: '#dddddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  loading: {
    marginBottom: 16,
  },
  goBack: {
    paddingLeft: 16,
    paddingRight: 16,
  },
});
