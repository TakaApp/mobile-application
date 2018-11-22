import React, { Component } from 'react';
import T from 'prop-types';

import { View, Button, StyleSheet } from 'react-native';
import { black, blue, red } from '@/utils/colors';

import SearchLocation from '../SearchLocation';

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

    // remove when ready for production XXX
    from: {
      lat: 47.2128,
      lng: -1.5625,
      name: 'Place Graslin',
    },
    to: {
      lat: 47.2077,
      lng: -1.5369,
      name: 'v Rue René Viviani',
    },
  };

  // called every time the users selects a suggestion
  // and when the state is updated we eventually look
  // for a route
  change = (fromTo, place) => this.setState({ [fromTo]: place }, this.lookForRoute);

  lookForRoute = async () => {
    this.props.onSearch();
    console.log('@lookForRoute', this.state);
    const { from, to } = this.state;
    if (!from || !to) return;

    // fetch the data from the API and update our state with it
    try {
      const response = await fetch('https://taka-api.aksels.io/trip', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          arriveBy: 'false',
          time: '10:30',
          date: '12-12-2018',
          from: `${this.state.from.lat},${this.state.from.lng}`,
          to: `${this.state.to.lat},${this.state.to.lng}`,
        }),
      });
      const data = await response.json();
      this.props.onResults(data.plan.itineraries || []);
    } catch (error) {
      console.log('error', error, Object.keys(error));
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={styles.itineraryillustration}>
            <View style={{ ...styles.dot, borderColor: red }} />
            <View style={styles.line} />
            <View style={{ ...styles.dot, borderColor: blue }} />
          </View>
          <View style={{ flexGrow: 1 }}>
            <SearchLocation placeholder="Départ.." onSelect={place => this.change('from', place)} />
            <View style={{ marginBottom: 8 }} />
            <SearchLocation placeholder="Destination.." onSelect={place => this.change('to', place)} />
          </View>
        </View>
        <Button onPress={this.lookForRoute} title="Rechercher" />
      </View>
    );
  }
}

RouteSearchForm.propTypes = {
  /* functions */
  onResults: T.func.isRequired,
  onSearch: T.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingLeft: 8,
    paddingRight: 8,
  },
  line: {
    borderRightColor: black,
    borderRightWidth: 2,
    flexGrow: 1,
    flexShrink: 0,
  },
  dot: {
    minHeight: 4,

    borderWidth: 4,
    borderRadius: 180,

    top: 2,
    right: -3,
  },
  itineraryillustration: {
    paddingLeft: 8,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
  }
});

export default RouteSearchForm;
