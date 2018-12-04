import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';

import isEmpty from 'lodash/isEmpty';
import RouteSearchForm from '@/components/RouteSearchForm';
import { notTotallyWhite, trueBlack, black } from '@/utils/colors';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import LegFactory from './Legs/LegFactory';
import Header from './Header';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    loading: false,
    results: [],
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
  };

  render() {
    const { selected } = this.state;
    const { navigation } = this.props;
    const results = navigation.getParam('results', []);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.goBack} onPress={() => this.props.navigation.goBack()}>
            <Ionicons name="ios-arrow-back" size={32} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerMainText}>Recherche</Text>
          <Image source={require('@/assets/images/icon.png')} style={{ height: 32, width: 32 }} />
        </View>
        <ScrollView style={styles.container}>
          {results.map((result, index) => (
            <View
              key={index}
              style={{
                marginBottom: 8,
                paddingLeft: 8,
                paddingRight: 8,
                backgroundColor: '#FFF',
              }}>
              <TouchableOpacity onPress={this.toggleItinerary(index)}>
                <Header itinerary={result} isSelected={selected === index} />
              </TouchableOpacity>
              {selected === index && <View>{result.legs.map(LegFactory.build)}</View>}
            </View>
          ))}
        </ScrollView>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: black,
    padding: 16,
    paddingTop: Constants.statusBarHeight + 16,
    paddingLeft: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#dddddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  headerMainText: {
    fontSize: 32,
    fontFamily: 'comfortaa',
    color: '#FFF',
  },
  loading: {
    marginBottom: 16,
  },
  goBack: {
    paddingLeft: 16,
    paddingRight: 16,
  }
});
