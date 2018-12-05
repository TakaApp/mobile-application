import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import RouteSearchForm from '@/components/RouteSearchForm';

import { Constants } from 'expo';

import { notTotallyWhite, black } from '@/utils/colors';
import { getResults } from '@/domains/search/selectors';
import NavigationService from '@/services/Navigation';

import Header from './Header';

class ResultsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    const { results } = this.props;

    return (
      <View style={styles.container}>
        <RouteSearchForm />
        <ScrollView style={styles.resultContainer}>
          {results.map((result, index) => (
            <View
              key={index}
              style={{
                marginBottom: 8,
                paddingLeft: 8,
                paddingRight: 8,
                backgroundColor: '#FFF',
              }}>
              <TouchableOpacity
                onPress={() => NavigationService.navigate('Itinerary', { selected: index })}>
                <Header itinerary={result} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

export default connect(state => ({
  results: getResults(state),
}))(ResultsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: notTotallyWhite,
  },
  resultContainer: {
    marginTop: 8,
  },
  map: {
    flexGrow: 1,
    height: 128,
  },
  header: {
    backgroundColor: black,
    padding: 16,
    paddingTop: Constants.statusBarHeight + 16,
    paddingLeft: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#888888',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  loading: {
    marginBottom: 16,
  },
  goBack: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  legs: {
    backgroundColor: '#FFF',
    borderRadius: 8,
    shadowColor: '#888888',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
});