import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';

import SettingsScreen from '@/screens/SettingsScreen';
import ItineraryScreen from '@/screens/ItineraryScreen';

import HomeScreen from '@/screens/HomeScreen';
import ResultsScreen from '@/screens/ResultsScreen';
import InfoScreen from '@/screens/InfoScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Results: ResultsScreen,
  Itinerary: ItineraryScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: '',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-search' : 'md-information-circle'}
    />
  ),
};

const InfoStack = createStackNavigator({
  Info: InfoScreen,
});

InfoStack.navigationOptions = {
  // tabBarLabel: 'Infos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-information-circle-outline' : 'md-options'}
    />
  ),
};

const PreferencesStack = createStackNavigator({
  Settings: SettingsScreen,
});

PreferencesStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

const InfoScreenStack = createStackNavigator({
  AppInfo: InfoScreen,
});

InfoScreenStack.navigationOptions = {
  tabBarLabel: 'Info',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-information-circle-outline' : 'md-information'}
    />
  ),
};

export default createBottomTabNavigator(
  {
    HomeStack,
    PreferencesStack,
    InfoStack,
    InfoScreenStack,
  },
  {
    tabBarOptions: {
      showLabel: false,
    },
  }
);
