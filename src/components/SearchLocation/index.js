import React, { Component } from 'react';
import T from 'prop-types';

import { StyleSheet, View, Text, FlatList, TextInput } from 'react-native';

import { black } from '@/utils/colors';

// SearchLocation is a component connected to Taka API
// which allows to search a place and select it
class SearchLocation extends Component {
  state = {
    // text inside the input
    inputText: '',
    // data fetched from the API which is an array of Object {
    //  lat: float64,
    //  lon: float64,
    //  stop_name: string,
    //  type: string
    // }
    data: [],
  };

  // called every time the user changes the input
  onChangeText = async inputText => {
    // near real-time update
    this.setState({ inputText });

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
        <TextInput
          style={styles.input}
          onChangeText={this.onChangeText}
          value={this.state.inputText}
          placeholder={this.props.placeholder}
        />

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

  /* data */
  placeholder: T.string.isRequired,
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
  },
});

export default SearchLocation;
