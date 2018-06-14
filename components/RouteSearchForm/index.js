import React, { Component } from 'react';
import T from 'prop-types';

import { View, Button } from 'react-native';

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
          date: '06-07-2018',
          from: `${this.state.from.lat},${this.state.from.lng}`,
          to: `${this.state.to.lat},${this.state.to.lng}`,
        }),
      });
      const data = await response.json();
      this.props.onResults(data.plan.itineraries);
    } catch (error) {
      console.log('error', error, Object.keys(error));
    }
  };

  render() {
    return (
      <View>
        <SearchLocation placeholder="Départ.." onSelect={place => this.change('from', place)} />
        <SearchLocation placeholder="Destination.." onSelect={place => this.change('to', place)} />

        <Button onPress={this.lookForRoute} title="Rechercher" />
      </View>
    );
  }
}

RouteSearchForm.propTypes = {
  /* functions */
  onResults: T.func.isRequired,
};

export default RouteSearchForm;
