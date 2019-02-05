import React from 'react';

import { connect } from 'react-redux';

import { StyleSheet, View, Image } from 'react-native';
import { Marker } from 'react-native-maps';
import { Spring } from 'react-spring';

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

  state = { flip: false };

  async componentDidMount() {
    this._sub = this.props.navigation.addListener('didFocus', () => {
      page('home');
    });
  }
  componentWillUnmount() {
    this._sub.remove();
  }

  flip = () => this.setState({ flip: !this.state.flip });

  render() {
    const { loading, searchParameters } = this.props;
    const { flip } = this.state;

    return (
      <View style={styles.container}>
        {loading && (
          <Spring
            reset
            reverse={flip}
            onRest={this.flip}
            config={{
              duration: 1000,
              precision: 0.001,
            }}
            from={{ ml: '-25%' }}
            to={{ ml: '115%' }}>
            {props => (
              <View
                style={{
                  backgroundColor: '#FFF',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 9999,
                  opacity: 0.9,
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../assets/images/tram-side.png')}
                  style={{ height: 64, width: 64, marginLeft: props.ml }}
                />
                <Image
                  source={require('../../assets/images/tram-side.png')}
                  style={{ height: 64, width: 64, marginLeft: props.ml }}
                />
                <Image
                  source={require('../../assets/images/tram-side.png')}
                  style={{ height: 64, width: 64, marginLeft: props.ml }}
                />
                <Image
                  source={require('../../assets/images/tram-side.png')}
                  style={{ height: 64, width: 64, marginLeft: props.ml }}
                />
              </View>
            )}
          </Spring>
        )}
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
              showsCompass={false}
              showsScale={false}
              rotateEnabled={false}>
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
        </View>
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
    left: '47%',
  },
});
