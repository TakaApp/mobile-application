import React, { Component } from 'react';
import T from 'prop-types';

import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Location, Permissions } from 'expo';

import { MaterialIcons } from '@expo/vector-icons';

import { black } from '@/utils/colors';

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
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    this.props.onSelect({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
      name: 'Mon emplacement',
    });
  };

  // called every time the user changes the input
  onChangeText = async inputText => {
    this.props.onInputChange(inputText);
    // fetch the data from the API and update our state with it
    const response = await fetch(`https://taka-api.aksels.io/search-location/${inputText}`);
    const data = await response.json();
    this.setState({ data });
  };

  // called when the user selects an option
  select = ({ lat, lng, text }) => {
    // dispatch the event that the user selected a Place
    this.props.onSelect({ lat, lng, name: text });

    // update the input text with the place name to make sure the user
    // understands that his choice is validated and clear the data from the
    // API which is no longer used
    this.setState({ inputText: text, data: [] });
  };

  render() {
    return (
      <View>
        {/* user input */}
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TextInput
            style={styles.input}
            onChangeText={this.onChangeText}
            value={this.props.inputText}
            placeholder={this.props.placeholder}
          />

          <View style={{ position: 'absolute', right: 8, top: 8 }}>
            <TouchableOpacity onPress={this.getLocationAsync}>
              <MaterialIcons name="my-location" size={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* suggestions */}
        <FlatList
          keyExtractor={item => `${item.name}${item.lat}`}
          data={this.state.data}
          renderItem={({ item }) => (
            <Text
              style={styles.item}
              onPress={() =>
                this.select({
                  lat: item.lat,
                  lng: item.lng,
                  text: item.name,
                })
              }>
              {item.name}
            </Text>
          )}
        />
      </View>
    );
  }
}

SearchLocation.propTypes = {
  /* functions */
  onSelect: T.func.isRequired,
  onInputChange: T.func.isRequired,

  /* data */
  placeholder: T.string.isRequired,
  // text inside the input
  inputText: T.string.isRequired,
};

/* component styles */
const styles = StyleSheet.create({
  item: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: black,
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 4,
    flexGrow: 1,
  },
});

export default SearchLocation;
