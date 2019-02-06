import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

import {
  Platform,
  View,
  Button,
  StyleSheet,
  Text,
  DatePickerIOS,
  DatePickerAndroid,
  TouchableOpacity,
  TimePickerAndroid,
} from 'react-native';
import { LinearGradient, Constants, Location, Permissions } from 'expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { updateSearchParameters, updateFormValue, search } from '@/domains/search/actions';
import { getSearchParameters, getFormValues } from '@/domains/search/selectors';
import { white, black, blue, red } from '@/utils/colors';

import NavigationService from '@/services/Navigation';

import { event } from '@/services/Analytics';

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
    if (this.props.setFromToCurrentPosition) {
      this.props.updateSearchParameters({
        from: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
          name: 'Mon emplacement',
        },
      });
    }

    this.props.updateFormValue({ fromText: 'Mon emplacement' });
  }

  change = (thing, place) => this.props.updateSearchParameters({ [thing]: place });
  setDate = date => this.props.updateSearchParameters({ date });
  setArriveBy = arriveBy => () => this.props.updateSearchParameters({ arriveBy });

  toggleDateOptions = () => this.setState({ dateOptionsOpened: !this.state.dateOptionsOpened });

  searchForNewLocation = location => (disableMyPosition = false) => {
    NavigationService.navigate('SearchLocation', {
      disableMyPosition,
      callback: place => {
        this.props.updateSearchParameters({ [location]: place, changeScreen: this.props.simple });
        this.props.updateFormValue({
          [`${location}Text`]: place.name,
        });
      },
    });
  };

  changeDateOnAndroid = async () => {
    const { date } = this.props.searchParameters;

    const { action, year, month, day } = await DatePickerAndroid.open({
      date: new Date(date),
    });

    if (action === DatePickerAndroid.dismissedAction) return;
    const newDate = moment(date);
    newDate.set({
      year,
      month,
      date: day,
    });

    this.setDate(newDate.toISOString());
  };
  changeHourOnAndroid = async () => {
    const { date } = this.props.searchParameters;
    const momentDate = moment(date);

    const { action, hour, minute } = await TimePickerAndroid.open({
      hour: momentDate.get('hour'),
      minute: momentDate.get('minutes'),
      is24Hour: true,
    });

    if (action === TimePickerAndroid.dismissedAction) return;

    const newDate = moment(date);
    newDate.set({
      hour,
      minute,
    });
    this.setDate(newDate.toISOString());
  };

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
        <View>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            {!simple && (
              <View style={styles.itineraryillustration}>
                <View style={{ ...styles.dot, borderColor: red }} />
                <View style={styles.line} />
                <View style={{ ...styles.dot, borderColor: blue }} />
              </View>
            )}
            {simple && <View style={{ paddingLeft: 16 }} />}
            <View style={{ flexGrow: 1 }}>
              {!simple && (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      event('location', 'change', 'from');
                      this.searchForNewLocation('from')();
                    }}>
                    <View style={styles.input}>
                      <Text>{fromText || 'Départ..'}</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ marginBottom: 8 }} />
                </View>
              )}
              <TouchableOpacity
                onPress={() => {
                  event('location', 'change', 'to');
                  this.searchForNewLocation('to')(simple);
                }}>
                <View style={styles.input}>
                  <Text>{toText || "Où est-ce qu'on va ?"}</Text>
                </View>
              </TouchableOpacity>
            </View>
            {!simple && (
              <TouchableOpacity onPress={this.reverseFromTo}>
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
                </View>
              </TouchableOpacity>
            )}
            {simple && <View style={{ paddingRight: 16 }} />}
          </View>
        </View>
        <View style={{ marginTop: 8 }}>
          {!simple && (
            <TouchableOpacity
              onPress={() => {
                event('location', 'toggle', 'date');
                this.toggleDateOptions();
              }}>
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
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                }}>
                <Button
                  onPress={() =>
                    this.props.updateSearchParameters({ date: new Date(), arriveBy: false })
                  }
                  style={{ color: '#09c6f9' }}
                  title="Maintenant"
                />
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                  <TouchableOpacity onPress={this.setArriveBy(false)}>
                    <LinearGradient
                      colors={arriveBy ? ['#FFF', '#FFF'] : ['#09c6f9', '#045de9']}
                      start={{ x: 0, y: 0.6 }}
                      end={{ x: 1, y: 0.25 }}
                      style={{
                        padding: 15,
                        alignItems: 'center',
                        borderTopLeftRadius: 5,
                        borderBottomLeftRadius: 5,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                      }}>
                      <Text style={{ color: arriveBy ? black : white }}>Partir à</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={this.setArriveBy(true)}>
                    <LinearGradient
                      colors={!arriveBy ? ['#FFF', '#FFF'] : ['#09c6f9', '#045de9']}
                      end={{ x: 0, y: 0.6 }}
                      start={{ x: 1, y: 0.25 }}
                      style={{
                        padding: 15,
                        alignItems: 'center',
                        borderTopRightRadius: 5,
                        borderBottomRightRadius: 5,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                      }}>
                      <Text style={{ color: arriveBy ? white : black }}>Arriver à</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
              {Platform.OS === 'ios' && <DatePickerIOS date={date} onDateChange={this.setDate} />}
              {Platform.OS === 'android' && (
                <View
                  style={{
                    padding: 16,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                  }}>
                  <TouchableOpacity onPress={this.changeDateOnAndroid}>
                    <LinearGradient
                      colors={['#5f6fee', '#5f8eee']}
                      style={{ padding: 8, borderRadius: 5 }}>
                      <Text style={{ textAlign: 'center', color: 'white' }}>
                        {moment(date).format('DD/MM/YYYY')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <Text style={{ textAlign: 'center' }}> à </Text>
                  <TouchableOpacity onPress={this.changeHourOnAndroid}>
                    <LinearGradient
                      colors={['#5f6fee', '#5f8eee']}
                      style={{ padding: 8, borderRadius: 5 }}>
                      <Text style={{ textAlign: 'center', color: 'white' }}>
                        {moment(date).format('HH:mm')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
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
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  datePicker: {
    flexGrow: 1,
  },
  input: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 4,
    padding: 16,

    flexGrow: 1,
    backgroundColor: '#FFF',
    shadowColor: '#dddddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
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
