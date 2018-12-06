import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

import { View, Button, StyleSheet, Text, DatePickerIOS, TouchableOpacity } from 'react-native';
import { LinearGradient, Constants, Location, Permissions } from 'expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { updateSearchParameters, updateFormValue, search } from '@/domains/search/actions';
import { getSearchParameters, getFormValues } from '@/domains/search/selectors';
import { white, black, blue, red } from '@/utils/colors';

import SearchLocation from '../SearchLocation';

class RouteSearchForm extends Component {
  state = {
    dateOptionsOpened: false,
  };

  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== 'granted') {
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    this.props.updateSearchParameters({
      from: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
        name: 'Mon emplacement',
      },
    });
    this.props.updateFormValue({ fromText: 'Mon emplacement' });
  }

  change = (thing, place) => this.props.updateSearchParameters({ [thing]: place });
  setDate = date => this.props.updateSearchParameters({ date });
  setArriveBy = arriveBy => () => this.props.updateSearchParameters({ arriveBy });

  toggleDateOptions = () => this.setState({ dateOptionsOpened: !this.state.dateOptionsOpened });

  reverseFromTo = () => {
    const { fromText, toText } = this.props.formValues;
    const { from, to } = this.props.searchParameters;

    this.props.updateSearchParameters({
      from: to,
      to: from,
    });

    this.props.updateFormValue({
      fromText: toText,
      toText: fromText,
    });
  };
  render() {
    const { dateOptionsOpened } = this.state;
    const { simple, formValues, searchParameters } = this.props;
    const { toText, fromText } = formValues;
    const { arriveBy, date } = searchParameters;

    return (
      <View style={styles.container}>
        <View style={{ zIndex: 99 }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={styles.itineraryillustration}>
              {!simple && (
                <>
                  <View style={{ ...styles.dot, borderColor: red }} />
                  <View style={styles.line} />
                </>
              )}
              <View style={{ ...styles.dot, borderColor: blue }} />
            </View>
            <View style={{ flexGrow: 1 }}>
              {!simple && (
                <View style={{ zIndex: 99 }}>
                  <SearchLocation
                    placeholder="Départ.."
                    onSelect={place => {
                      this.change('from', place);
                      this.props.updateFormValue({ fromText: place.name });
                    }}
                    inputText={fromText}
                    onInputChange={text => this.props.updateFormValue({ fromText: text })}
                  />
                  <View style={{ marginBottom: 8 }} />
                </View>
              )}
              <SearchLocation
                placeholder="Où est-ce qu'on va ?"
                onSelect={place => {
                  this.change('to', place);
                  this.props.updateFormValue({ toText: place.name });
                }}
                inputText={toText}
                onInputChange={text => this.props.updateFormValue({ toText: text })}
              />
            </View>
            <TouchableOpacity onPress={simple ? this.props.search : this.reverseFromTo}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  flexGrow: 1,
                  paddingLeft: 8,
                  paddingRight: 8,
                  justifyContent: 'center',
                }}>
                {!simple && <MaterialIcons name="swap-vert" size={32} color={black} />}
                {simple && <Ionicons name="ios-search" size={26} color="transparent" />}
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ zIndex: 0 }}>
          {!simple && (
            <TouchableOpacity onPress={this.toggleDateOptions}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={styles.itineraryillustration}>
                  <Ionicons name="ios-time" size={16} color={black} />
                </View>
                <View style={{ ...styles.itineraryillustration, flexGrow: 1 }}>
                  <Text>
                    {arriveBy ? 'Arrivée' : 'Départ'} :{' '}
                    {moment(date)
                      .calendar()
                      .toLowerCase()}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
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
                  onPress={() =>
                    this.props.updateSearchParameters({ date: new Date(), arriveBy: false })
                  }
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
              <DatePickerIOS date={date} onDateChange={this.setDate} />
            </View>
          )}
        </View>
      </View>
    );
  }
}

RouteSearchForm.propTypes = {};

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

export default connect(
  state => ({
    searchParameters: getSearchParameters(state),
    formValues: getFormValues(state),
  }),
  dispatch =>
    bindActionCreators(
      {
        updateSearchParameters,
        updateFormValue,
        search,
      },
      dispatch
    )
)(RouteSearchForm);
