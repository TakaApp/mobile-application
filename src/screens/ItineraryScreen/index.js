import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import RouteSearchForm from '@/components/RouteSearchForm';
import { notTotallyWhite, trueBlack } from '@/utils/colors';

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

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerMainText}>Recherche</Text>
          <Ionicons name="ios-search" size={32} color={trueBlack} />
        </View>
        <RouteSearchForm
          onResults={this.onItineraryResults}
          onSearch={() => this.setState({ loading: true })}
        />
        {this.state.loading && (
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
        )}
        <ScrollView style={styles.container}>
          {/* itineraries */}
          {this.state.hasSearched && (
            <View>
              {this.state.results.map((result, index) => (
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
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc',
  },
  header: {
    backgroundColor: notTotallyWhite,
    padding: 16,
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
    color: trueBlack,
  },
  loading: {
    marginBottom: 16,
  },
});
