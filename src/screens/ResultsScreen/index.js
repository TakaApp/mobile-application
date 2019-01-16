import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';
import RouteSearchForm from '@/components/RouteSearchForm';

import { Constants } from 'expo';

import { notTotallyWhite, black } from '@/utils/colors';
import { getResults, getIsLoading } from '@/domains/search/selectors';
import NavigationService from '@/services/Navigation';
import { page } from '@/services/Analytics';

import Header from './Header';

class ResultsScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    page('results');
    this._sub = this.props.navigation.addListener('didFocus', () => page('results'));
  }
  componentWillUnmount() {
    this._sub.remove();
  }

  render() {
    const { results, loading } = this.props;

    return (
      <View style={styles.container}>
        <View style={{ zIndex: 99 }}>
          <RouteSearchForm />
        </View>
        <ScrollView style={styles.resultContainer}>
          {results.length > 0 &&
            !loading &&
            results.map((result, index) => (
              <View
                key={index}
                style={{
                  marginBottom: 8,
                  paddingLeft: 16,
                  paddingRight: 16,
                  backgroundColor: '#FFF',
                }}>
                <TouchableOpacity
                  onPress={() => NavigationService.navigate('Itinerary', { selected: index })}>
                  <Header itinerary={result} />
                </TouchableOpacity>
              </View>
            ))}
          {results.length === 0 && !loading && (
            <View style={{ display: 'flex', alignContent: 'center' }}>
              <Text style={{ textAlign: 'center' }}>Aucun résultat (ಥ﹏ಥ)</Text>
            </View>
          )}
          {loading && (
            <View style={styles.loading}>
              <ActivityIndicator />
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default connect(state => ({
  results: getResults(state),
  loading: getIsLoading(state),
}))(ResultsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: notTotallyWhite,
  },
  resultContainer: {
    marginTop: 8,
    zIndex: 0,
  },
  loading: {
    marginTop: 32,
    display: 'flex',
    alignContent: 'center',
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
