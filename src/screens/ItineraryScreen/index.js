import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import LegFactory from './Legs/LegFactory';
import Header from './Header';

class ItineraryScreen extends Component {
  render() {
    const { navigation } = this.props;
    const i = navigation.getParam('itinerary', {});

    console.log('i', i);

    return (
      <ScrollView style={styles.container}>
        <Header itinerary={i} />
        {i.legs.map(LegFactory.build)}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

export default ItineraryScreen;
