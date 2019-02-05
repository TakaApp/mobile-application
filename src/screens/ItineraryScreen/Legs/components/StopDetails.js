import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

class StopDetails extends React.Component {
  state = {
    displayStopDetails: false,
  };

  displayStopDetails = () => {
    this.setState({ displayStopDetails: !this.state.displayStopDetails });
  };

  render() {
    const { stopDetails } = this.props;
    const { displayStopDetails } = this.state;

    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          {!displayStopDetails && (
            <TouchableOpacity onPress={this.displayStopDetails}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 8,
                }}>
                <Text style={{ transform: [{ rotate: '90deg' }] }}>
                  <MaterialIcons name="code" size={24} />
                </Text>
                <Text>
                  {stopDetails.length} arrêt{stopDetails.length > 1 ? 's' : ''}{' '}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {displayStopDetails && (
            <View>
              {Array.isArray(stopDetails) &&
                stopDetails.map(sd => (
                  <View key={sd.name} style={{ padding: 8 }}>
                    <Text>{sd.name}</Text>
                  </View>
                ))}
            </View>
          )}
        </View>
      </View>
    );
  }
}

StopDetails.defaultProps = {
  stopDetails: [],
};

export default StopDetails;
