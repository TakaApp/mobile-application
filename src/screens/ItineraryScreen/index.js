import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import RouteSearchForm from '@/components/RouteSearchForm';

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
        <RouteSearchForm
          onResults={this.onItineraryResults}
          onSearch={() => this.setState({ loading: true })}
        />
        {this.state.loading && (
          <View>
            <Text>Recherche en cours..</Text>
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
});
