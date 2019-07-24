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
  Platform,
  AsyncStorage,
  Image,
} from 'react-native';
import { Location, Haptic } from 'expo';
import Sentry from 'sentry-expo';

import get from 'lodash/get';
import uniqBy from 'lodash/uniqBy';
import remove from 'lodash/remove';
import isEmpty from 'lodash/isEmpty';
import debounce from 'lodash/debounce';

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
    history: [],
    hasSearched: false,
    loading: false,
  };

  async componentDidMount() {
    let history = [];
    try {
      history = JSON.parse(await AsyncStorage.getItem('search-history'));
      history = uniqBy(history, 'name');
      remove(history, i => isEmpty(i) || !i.name || !i.lat || !i.lng);
    } catch (e) {}
    this.setState({ history: history || [] });
  }

  getLocationAsync = async () => {
    let location = await Location.getCurrentPositionAsync({});

    if (Platform.OS === 'ios') {
      Haptic.selection();
    }

    const lat = location.coords.latitude;
    const lng = location.coords.longitude;

    let currentPositionName = null;

    try {
      const response = await fetch(`https://api.nantes.cool/reverse-geocoding`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat,
          lng,
        }),
      });

      const data = await response.json();

      currentPositionName = get(data[0], 'name');
    } catch (e) {
      Sentry.captureMessage(`${e.message} ${JSON.stringify(e.stack)}`);
      currentPositionName = 'Mon emplacement';
    }

    this.props.onSelect({
      lat,
      lng,
      name: currentPositionName,
    });
  };

  fetchData = async () => {
    try {
      const response = await fetch(
        `https://api.nantes.cool/search-location/${this.props.inputText}`
      );
      const data = await response.json();
      this.setState({ data: data || [], hasSearched: true, loading: false });
    } catch (e) {
      this.props.putError(`On a quelques problèmes pour se connecter au serveur... (ง'̀-'́)ง`);
      this.setState({ loading: false });
    }
  };
  debouncedFetchData = debounce(this.fetchData, 250);

  // called every time the user changes the input
  onChangeText = async inputText => {
    this.setState({ loading: true });
    this.props.onInputChange(inputText);

    // fetch the data from the API and update our state with it
    this.debouncedFetchData();
  };

  // called when the user selects an option
  select = async ({ lat, lng, text }) => {
    if (Platform.OS === 'ios') {
      Haptic.selection();
    }

    const oldHistory = get(this.state, 'history', []);
    let newHistory = [...oldHistory];

    newHistory.push({ lat, lng, name: text });
    newHistory = uniqBy(newHistory, 'name');
    remove(newHistory, i => isEmpty(i) || !i.name || !i.lat || !i.lng);
    while (newHistory.length > 2) newHistory.shift();
    await AsyncStorage.setItem('search-history', JSON.stringify(newHistory));

    // dispatch the event that the user selected a Place
    this.props.onSelect({ lat, lng, name: text });

    // update the input text with the place name to make sure the user
    // understands that his choice is validated and clear the data from the
    // API which is no longer used
    this.setState({ inputText: text, data: [], hasSearched: false, history: newHistory });
  };

  render() {
    const { loading, hasSearched, data, history } = this.state;
    const { disableMyPosition } = this.props;

    return (
      <View>
        {/* user input */}
        <TouchableOpacity style={styles.item}>
          <Text>
            Résultats améliorés par
            <Image
              source={require('../../assets/images/algolia.png')}
              style={{ maxHeight: 20, maxWidth: 100 }}
              resizeMode="contain"
            />
          </Text>
        </TouchableOpacity>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TextInput
            style={styles.input}
            onChangeText={this.onChangeText}
            value={this.props.inputText}
            placeholder={this.props.placeholder}
            onFocus={this.props.onFocus}
            autoFocus={this.props.autoFocus}
          />

          {loading && (
            <View style={{ position: 'absolute', right: 42, top: 10.5 }}>
              <TouchableOpacity onPress={this.getLocationAsync}>
                <ActivityIndicator />
              </TouchableOpacity>
            </View>
          )}
          <View style={{ position: 'absolute', right: 8, top: 8 }}>
            {!disableMyPosition && (
              <TouchableOpacity onPress={this.getLocationAsync}>
                <MaterialIcons name="my-location" size={24} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* suggestions */}
        <View style={{ marginTop: 8 }}>
          {hasSearched && data.length === 0 && (
            <FlatList
              keyExtractor={item => item}
              data={['foo']}
              renderItem={() => <Text style={styles.item}>Aucun résultat (╯°□°）╯︵ ┻━┻</Text>}
            />
          )}
          {!hasSearched && history.length > 0 && (
            <FlatList
              keyboardShouldPersistTaps="always"
              keyExtractor={item => `${item.name}${item.lat}${item.lng}`}
              data={history}
              style={{ backgroundColor: '#FFF' }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() =>
                    this.select({
                      lat: item.lat,
                      lng: item.lng,
                      text: item.name,
                    })
                  }>
                  <Text>{item.name}</Text>
                  <MaterialIcons name="history" size={24} />
                </TouchableOpacity>
              )}
            />
          )}
          {data.length > 0 && (
            <>
              <FlatList
                keyboardShouldPersistTaps="always"
                keyExtractor={item => `${item.name}${item.lat}${item.lng}`}
                data={data}
                style={{ backgroundColor: '#FFF' }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() =>
                      this.select({
                        lat: item.lat,
                        lng: item.lng,
                        text: item.name,
                      })
                    }>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </>
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
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
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
