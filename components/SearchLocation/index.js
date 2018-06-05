import React, { Component } from 'react';

import {
  StyleSheet,

  View,
  Text,
  FlatList,
  TextInput,
} from 'react-native';

class SearchLocation extends Component {
  state = {
    inputText: '',
  }

  select = ({ lat, lon, text }) => {
    console.log('select', lat, lon, text);
  }

  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={inputText => this.setState({ inputText })}
          value={this.state.inputText}
        />
        <FlatList
          keyExtractor={item => item.stop_name}
          data={[
            {lat: 0, lon: 0, stop_name: 'Devin'},
            {lat: 0, lon: 0, stop_name: 'Jackson'},
            {lat: 0, lon: 0, stop_name: 'James'},
            {lat: 0, lon: 0, stop_name: 'Joel'},
            {lat: 0, lon: 0, stop_name: 'John'},
            {lat: 0, lon: 0, stop_name: 'Jillian'},
            {lat: 0, lon: 0, stop_name: 'Jimmy'},
            {lat: 0, lon: 0, stop_name: 'Julie'},
          ]}
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

const styles = StyleSheet.create({
});

export default SearchLocation;
