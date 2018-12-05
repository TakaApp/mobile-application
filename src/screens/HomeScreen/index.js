import React from 'react';

import { connect } from 'react-redux';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import { MapView } from 'expo';
import isEmpty from 'lodash/isEmpty';
import RouteSearchForm from '@/components/RouteSearchForm';
import { notTotallyWhite, trueBlack } from '@/utils/colors';

import { getSearchParameters, getResults } from '@/domains/search/selectors';

import LegFactory from './Legs/LegFactory';
import Header from './Header';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    loading: false,
    hasSearched: false,

    selected: -1,
  };

  toggleItinerary = index => () => {
    const { selected } = this.state;

    if (index === selected) {
      this.setState({ selected: -1 });
      return;
    }
    this.setState({ selected: index });
  };

  onItineraryResults = results => {
    this.setState({ results, hasSearched: true, loading: false });
    this.props.navigation.navigate('Itinerary', { results });
  };

  render() {
    const { selected } = this.state;
    console.log('props', this.props.searchParameters);
    return (
      <View style={styles.container}>
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
            showsUserLocation
          />
        </View>
        <View style={{ zIndex: 2 }}>
          <RouteSearchForm simple />
        </View>
        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    );
  }
}

export default connect(
  state => ({
    searchParameters: getSearchParameters(state),
    results: getResults(state),
  }),
  null
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexGrow: 1,
  },
  map: {
    display: 'flex',
    zIndex: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  loading: {
    marginBottom: 16,
  },
});
