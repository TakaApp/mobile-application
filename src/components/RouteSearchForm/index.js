import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import moment from 'moment';

import { View, Button, StyleSheet, Text, DatePickerIOS, TouchableOpacity } from 'react-native';
import { LinearGradient, Constants } from 'expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { updateSearchParameters, updateFormValue } from '@/domains/search/actions';
import { white, black, blue, red } from '@/utils/colors';

import SearchLocation from '../SearchLocation';
import { getSearchParameters, getFormValues } from '../../domains/search/selectors';

class RouteSearchForm extends Component {
  state = {
    fromText: '',
    toText: '',
    // remove when ready for production XXX
  };

  change = (thing, place) => this.props.updateSearchParameters({ [thing]: place });
  setDate = date => this.props.updateSearchParameters({ date });
  setArriveBy = arriveBy => () => this.props.updateSearchParameters({ arriveBy });

  openDateOptions = () => this.setState({ dateOptionsOpened: true });

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
    const { dateOptionsOpened, arriveBy } = this.state;
    const { simple } = this.props;
    const { toText, fromText } = this.props.formValues;

    return (
      <View style={styles.container}>
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
              <>
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
              </>
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
          <TouchableOpacity onPress={simple ? () => true : this.reverseFromTo}>
            <View>
              <MaterialIcons name="swap-vert" size={32} color={simple ? 'transparent' : black} />
            </View>
          </TouchableOpacity>
        </View>

        {!simple && (
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
        )}
        {!simple && dateOptionsOpened && (
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
      },
      dispatch
    )
)(RouteSearchForm);
