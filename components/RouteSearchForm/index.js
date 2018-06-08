import React, { Component } from 'react';
import T from 'prop-types';

import {
  StyleSheet,

  View,
  Text,
  FlatList,
  TextInput,
} from 'react-native';

// RouteSearchForm is a component connected to Taka API
// which triggers a search when both from & to state attributes
// are valid.
class RouteSearchForm extends Component {
  state = {
    // Objects of this shape
    // {
    //    lat: float
    //    lng: float
    //    name: string
    // }
    from: null,
    to: null,
  }

  // called every time the users selects a suggestion
  // and when the state is updated we eventually look
  // for a route
  change = (fromTo, place) => this.setState({ [from]: place }, this.lookForRoute);

  lookForRoute = () => {
    const { from, to } = state;
    if (!from || !to) return;

    // fetch the data from the API and update our state with it
    const response = await fetch('https://taka-api.aksels.io/trip', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        arriveBy: false,
        time: '10:30',
        date: '06-07-2018',
        from: `${this.state.from.lat},${this.state.from.lng}`,
        to: `${this.state.to.lat},${this.state.to.lng}`,
      }),
    });
    const data = await response.json();
    console.log('data >', data);
    this.setState({ data });
  }

  // called when the user selects an option
  select = ({ lat, lon, text }) => {
    // dispatch the event that the user selected a Place
    this.props.onSelect({ lat, lng: lon, name: text });

    // update the input text with the place name to make sure the user
    // understands that his choice is validated and clear the data from the
    // API which is no longer used
    this.setState({ inputText: text, data: [] });
  }

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
          keyExtractor={item => String(item.stop_name)}
          data={this.state.data}
          renderItem={({item}) => (
            <Text style={styles.item} onPress={() => this.select({
              lat: item.lat,
              lon: item.lon,
              text: item.stop_name,
            })}>
              {item.stop_name}
            </Text>
          )}
        />
      </View>
    );
  }
};

RouteSearchForm.propTypes = {
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
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    paddingLeft: 16,
  },
});

export default RouteSearchForm;
