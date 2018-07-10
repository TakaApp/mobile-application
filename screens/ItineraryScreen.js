import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';

import LegType from '../components/LegType';

export default class ItineraryScreen extends React.Component {
  render() {
    const { navigation } = this.props;
    const i = navigation.getParam('itinerary', {});

    return (
      <ScrollView style={styles.container}>
        <View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <View
              style={{
                flex: 4,
                display: 'flex',
                flexDirection: 'row',
              }}>
              {/* Legs Walk > Bus > Walk ... */}
              {i.legs.map((leg, index) => (
                <View
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                  }}>
                  <LegType leg={leg} />
                  {index !== i.legs.length - 1 && <Text style={{ color: '#CCCCCC' }}>{' > '}</Text>}
                </View>
              ))}
            </View>
            <Text style={{ flex: 1, padding: 4 }}>{Math.round(i.duration / 60)} min ></Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});