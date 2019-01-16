import React from 'react';
import { View } from 'react-native';

import SearchLocation from '@/components/SearchLocation';
import { page } from '@/services/Analytics';

export default class SearchLocationScreen extends React.Component {
  static navigationOptions = {
    title: 'Rechercher un lieu',
  };

  state = {
    searchText: '',
  };

  async componentDidMount() {
    page('searchLocation');
    this._sub = this.props.navigation.addListener('didFocus', () => page('searchLocation'));
  }
  componentWillUnmount() {
    this._sub.remove();
  }

  render() {
    const { searchText } = this.state;
    const { navigation } = this.props;
    const callback = navigation.getParam('callback', () => true);

    return (
      <View style={{ padding: 16 }}>
        <SearchLocation
          placeholder="Rechercher"
          onSelect={async place => {
            navigation.goBack();
            callback(place);
          }}
          inputText={searchText}
          onInputChange={searchText => this.setState({ searchText })}
          autoFocus
        />
      </View>
    );
  }
}
