import React, { Component } from 'react';
import T from 'prop-types';

import moment from 'moment';

import { Animated, View, Button, StyleSheet, Text, DatePickerIOS, TouchableOpacity } from 'react-native';
import { LinearGradient, Constants } from 'expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { white, black, blue, red } from '@/utils/colors';

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
    date: new Date(),
    arriveBy: false,

    fromText: '',
    toText: '',

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
  change = (thing, place) => this.setState({ [thing]: place }, () => {
    this.lookForRoute();
  });

  lookForRoute = async () => {
    const { arriveBy, date, from, to } = this.state;
    this.setState({ dateOptionsOpened: false });

    if (!from || !to) return;

    this.props.onSearch();

    // fetch the data from the API and update our state with it
    try {
      console.log('calling api');
      const response = await fetch('https://api.nantes.cool/trip', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          arriveBy: arriveBy ? 'true' : 'false',
          time: moment(date).format('HH:mm'),
          date: moment(date).format('MM-DD-YYYY'),
          from: `${this.state.from.lat},${this.state.from.lng}`,
          to: `${this.state.to.lat},${this.state.to.lng}`,
        }),
      });
      const data = await response.json();
      this.props.onResults(data.plan.itineraries || []);
    } catch (error) {
      console.log('error', error, Object.keys(error));
      // TODO gestion d'erreur
    }
  };

  openDateOptions = () => this.setState({ dateOptionsOpened: true });

  setDate = date => this.setState({ date });
  setArriveBy = arriveBy => () => this.setState({ arriveBy });
  reverseFromTo = () => {
    const { from, to, fromText, toText } = this.state;

    this.setState(
      {
        from: to,
        to: from,
        fromText: toText,
        toText: fromText,
      },
      this.lookForRoute
    );
  };
  render() {
    const { dateOptionsOpened, arriveBy, toText, fromText } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={styles.itineraryillustration}>
            <View style={{ ...styles.dot, borderColor: red }} />
            <View style={styles.line} />
            <View style={{ ...styles.dot, borderColor: blue }} />
          </View>
          <View style={{ flexGrow: 1 }}>
            <SearchLocation
              placeholder="Départ.."
              onSelect={place => {
                this.change('from', place);
                this.setState({ fromText: place.name });
              }}
              inputText={fromText}
              onInputChange={text => this.setState({ fromText: text })}
            />
            <View style={{ marginBottom: 8 }} />
            <SearchLocation
              placeholder="Où est-ce qu'on va ?"
              onSelect={place => {
                this.change('to', place);
                this.setState({ toText: place.name });
              }}
              inputText={toText}
              onInputChange={text => this.setState({ toText: text })}
            />
          </View>
          <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <TouchableOpacity onPress={this.reverseFromTo}>
              <View>
                <MaterialIcons name="swap-vert" size={32} color={black} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity onPress={this.openDateOptions}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={styles.itineraryillustration}>
              <Ionicons name="ios-time" size={16} color={black} />
            </View>
            <View style={{ ...styles.itineraryillustration, flexGrow: 1 }}>
              <Text>
                {arriveBy ? 'Arrivée' : 'Départ'} :{' '}
                {moment(this.state.date)
                  .calendar()
                  .toLowerCase()}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {dateOptionsOpened && (
          <View>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Button
                onPress={() => this.setState({ date: new Date(), arriveBy: false })}
                title="Maintenant"
              />
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.setArriveBy(false)}>
                  <LinearGradient
                    colors={arriveBy ? [] : ['#5f6fee', '#5f8eee']}
                    style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
                    <Text style={{ color: arriveBy ? black : white }}>Partir à</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.setArriveBy(true)}>
                  <LinearGradient
                    colors={arriveBy ? ['#5f6fee', '#5f8eee'] : []}
                    style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
                    <Text style={{ color: arriveBy ? white : black }}>Arriver à</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
            <DatePickerIOS date={this.state.date} onDateChange={this.setDate} />
            <TouchableOpacity onPress={this.lookForRoute}>
              <LinearGradient
                colors={['#5f6fee', '#5f8eee']}
                style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
                <Text style={{ color: white }}>Rechercher</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={this.lookForRoute}>
          <LinearGradient
            colors={['#5f6fee', '#5f8eee']}
            style={{ padding: 15, alignItems: 'center', borderRadius: 5 }}>
            <Text style={{ color: white }}>Rechercher</Text>
          </LinearGradient>
        </TouchableOpacity>
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
    paddingTop: Constants.statusBarHeight + 16,
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

    top: 0,
    right: -3,
  },
  itineraryillustration: {
    paddingLeft: 8,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  datePicker: {
    flexGrow: 1,
  },
});

export default RouteSearchForm;
