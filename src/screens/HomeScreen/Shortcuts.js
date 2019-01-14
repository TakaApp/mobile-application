import React from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { LinearGradient, Location } from 'expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { updateSearchParameters, updateFormValue } from '@/domains/search/actions';

class Shortcuts extends React.Component {
  state = {
    home: null,
    work: null,
  };

  async componentDidMount() {
    await this.refresh();
    this._sub = this.props.navigation.addListener('didFocus', this.refresh);
  }
  componentWillUnmount() {
    this._sub.remove();
  }

  refresh = async () => {
    const home = JSON.parse(await AsyncStorage.getItem('home'));
    const work = JSON.parse(await AsyncStorage.getItem('work'));

    this.setState({ home, work });
  };

  search = async place => {
    let location = await Location.getCurrentPositionAsync({});

    this.props.updateSearchParameters({
      from: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        name: 'Mon emplacement',
      },
      to: {
        lat: place.lat,
        lng: place.lng,
        name: place.name,
      },
    });

    this.props.updateFormValue({ toText: place.name });
  };

  render() {
    const { home, work } = this.state;

    console.log('home', home);

    return (
      <View style={{ padding: 16 }}>
        {home && (
          <TouchableOpacity onPress={() => this.search(home)}>
            <LinearGradient
              colors={['#09c6f9', '#045de9']}
              start={{ x: 0, y: 0.6 }}
              end={{ x: 1, y: 0.25 }}
              style={{
                borderRadius: 5,
                padding: 16,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View>
                <Ionicons name="ios-home" size={32} color="#FFF" />
              </View>
              <View>
                <Text style={{ color: '#FFF' }}>{home.name}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
        {work && (
          <TouchableOpacity onPress={() => this.search(work)}>
            <LinearGradient
              colors={['#09c6f9', '#045de9']}
              start={{ x: 0, y: 0.6 }}
              end={{ x: 1, y: 0.25 }}
              style={{
                borderRadius: 5,
                padding: 16,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 16,
              }}>
              <View style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <MaterialIcons name="work" size={32} color="#FFF" />
              </View>
              <View>
                <Text style={{ color: '#FFF' }}>{work.name}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

export default connect(
  null,
  dispatch =>
    bindActionCreators(
      {
        updateSearchParameters,
        updateFormValue,
      },
      dispatch
    )
)(Shortcuts);
