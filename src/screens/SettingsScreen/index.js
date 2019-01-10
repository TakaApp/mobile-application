import React from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';

import { LinearGradient } from 'expo';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import NavigationService from '@/services/Navigation';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Préférences',
  };

  state = {
    home: null,
    work: null,
  };

  async componentDidMount() {
    await this.refresh();
  }

  refresh = async () => {
    const home = JSON.parse(await AsyncStorage.getItem('home'));
    const work = JSON.parse(await AsyncStorage.getItem('work'));

    this.setState({ home, work });
  };

  searchForNewLocation = location => () => {
    NavigationService.navigate('SearchLocation', {
      callback: async place => {
        await AsyncStorage.setItem(location, JSON.stringify(place));
        this.refresh();
      },
    });
  };

  render() {
    const { home, work } = this.state;

    return (
      <View style={{ padding: 16 }}>
        <TouchableOpacity onPress={this.searchForNewLocation('home')}>
          <LinearGradient
            colors={!home ? ['#F5F7FA', '#B8C6DB'] : ['#0BAB64', '#3BB78F']}
            style={{ borderRadius: 5, padding: 16 }}>
            <View style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Ionicons name="ios-home" size={32} color="#FFF" />
            </View>
            <View>
              {home && <Text>{home.name}</Text>}
              {!home && <Text>Appuyez pour définir le lieu de votre habitation</Text>}
            </View>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.searchForNewLocation('work')}>
          <LinearGradient
            colors={!work ? ['#F5F7FA', '#B8C6DB'] : ['#0BAB64', '#3BB78F']}
            style={{ borderRadius: 5, padding: 16, marginTop: 16 }}>
            <View style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <MaterialIcons name="work" size={32} color="#FFF" />
            </View>
            <View>
              {work && <Text>{work.name}</Text>}
              {!work && <Text>Appuyez pour définir le lieu de travail</Text>}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }
}
