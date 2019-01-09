import React, { Component } from 'react';
import T from 'prop-types';

import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Location } from 'expo';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MaterialIcons } from '@expo/vector-icons';
import { putError } from '@/domains/error/actions';

// SearchLocation is a component connected to Taka API
// which allows to search a place and select it
class SearchLocation extends Component {
  state = {
    // data fetched from the API which is an array of Object {
    //  lat: float64,
    //  lon: float64,
    //  stop_name: string,
    //  type: string
    // }
    data: [],
    hasSearched: false,
    loading: false,
  };

  getLocationAsync = async () => {
    let location = await Location.getCurrentPositionAsync({});

    this.props.onSelect({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      name: 'Mon emplacement',
    });
  };

  // called every time the user changes the input
  onChangeText = async inputText => {
    this.setState({ loading: true });
    this.props.onInputChange(inputText);

    // fetch the data from the API and update our state with it
    try {
      const response = await fetch(`https://api.nantes.cool/search-location/${inputText}`);
      const data = await response.json();
      this.setState({ data: data || [], hasSearched: true, loading: false });
    } catch (e) {
      this.props.putError(`Le serveur a quelques problèmes... (ง'̀-'́)ง`);
      this.setState({ loading: false });
    }
  };

  // called when the user selects an option
  select = ({ lat, lng, text }) => {
    // dispatch the event that the user selected a Place
    this.props.onSelect({ lat, lng, name: text });

    // update the input text with the place name to make sure the user
    // understands that his choice is validated and clear the data from the
    // API which is no longer used
    this.setState({ inputText: text, data: [], hasSearched: false });
  };

  render() {
    const { loading, hasSearched, data } = this.state;

    return (
      <View>
        {/* user input */}
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TextInput
            style={styles.input}
            onChangeText={this.onChangeText}
            value={this.props.inputText}
            placeholder={this.props.placeholder}
            onFocus={this.props.onFocus}
          />

          {loading && (
            <View style={{ position: 'absolute', right: 42, top: 10.5 }}>
              <TouchableOpacity onPress={this.getLocationAsync}>
                <ActivityIndicator />
              </TouchableOpacity>
            </View>
          )}
          <View style={{ position: 'absolute', right: 8, top: 8 }}>
            <TouchableOpacity onPress={this.getLocationAsync}>
              <MaterialIcons name="my-location" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* suggestions */}
        <View style={{ position: 'absolute', top: 32 }}>
          {hasSearched && data.length === 0 && (
            <FlatList
              keyExtractor={item => item}
              data={['foo']}
              renderItem={() => <Text style={styles.item}>Aucun résultat (╯°□°）╯︵ ┻━┻</Text>}
            />
          )}
          {data.length > 0 && (
            <FlatList
              keyboardShouldPersistTaps="always"
              keyExtractor={item => `${item.name}${item.lat}${item.lng}`}
              data={data}
              style={{ backgroundColor: '#FFF' }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={{
                    zIndex: 9,
                  }}
                  onPress={() =>
                    this.select({
                      lat: item.lat,
                      lng: item.lng,
                      text: item.name,
                    })
                  }>
                  <Text style={styles.item}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          )}
        </View>
      </View>
    );
  }
}

SearchLocation.propTypes = {
  /* functions */
  onSelect: T.func.isRequired,
  onInputChange: T.func.isRequired,
  onFocus: T.func,

  /* data */
  placeholder: T.string.isRequired,
  // text inside the input
  inputText: T.string.isRequired,
};

/* component styles */
const styles = StyleSheet.create({
  item: {
    padding: 16,
    backgroundColor: '#FFF',
    zIndex: 10,
  },
  input: {
    height: 40,
    paddingLeft: 8,
    borderRadius: 4,

    flexGrow: 1,
    backgroundColor: '#FFF',
    shadowColor: '#dddddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
});

export default connect(
  null,
  dispatch =>
    bindActionCreators(
      {
        putError,
      },
      dispatch
    )
)(SearchLocation);
