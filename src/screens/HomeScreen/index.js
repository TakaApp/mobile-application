import React from 'react';

import { connect } from 'react-redux';

import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Marker } from 'react-native-maps';

import { MapView } from 'expo';
import RouteSearchForm from '@/components/RouteSearchForm';

import { getSearchParameters, getResults, getIsLoading } from '@/domains/search/selectors';
import { blue } from '@/utils/colors';
import { page } from '@/services/Analytics';

import Shortcuts from './Shortcuts';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    this._sub = this.props.navigation.addListener('didFocus', () => {
      page('home');
    });
  }
  componentWillUnmount() {
    this._sub.remove();
  }

  state = {
    loading: false,
    hasSearched: false,
  };

  render() {
    const { loading, searchParameters } = this.props;
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
            showsUserLocation>
            {searchParameters.to && (
              <Marker
                identifier="To"
                flat
                pinColor={blue}
                coordinate={{
                  latitude: searchParameters.to.lat,
                  longitude: searchParameters.to.lng,
                }}
              />
            )}
          </MapView>
        </View>
        <View style={{ zIndex: 2 }}>
          <RouteSearchForm simple setFromToCurrentPosition />
        </View>
        <Shortcuts navigation={this.props.navigation} />
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        )}
      </View>
    );
  }
}

export default connect(state => ({
  searchParameters: getSearchParameters(state),
  results: getResults(state),
  loading: getIsLoading(state),
}))(HomeScreen);

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
    marginTop: 32,
    position: 'absolute',
    top: '49%',
    left: '48%',
  },
});
