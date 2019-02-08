import React from 'react';

import { Constants } from 'expo';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import { page } from '@/services/Analytics';

class InfoScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  async componentDidMount() {
    this._sub = this.props.navigation.addListener('didFocus', () => page('info'));
  }
  componentWillUnmount() {
    this._sub.remove();
  }

  render() {
    const { manifest } = Constants;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.main}>
          <View style={styles.futur}>
            <View style={styles.contribute}>
              <Text style={{ textAlign: 'center' }}>
                Vous êtes developpeur ? Vous pouvez participer à l'évolution de cette application !
              </Text>
            </View>
            <View style={styles.roadmap}>
              <Text style={{ textAlign: 'center', fontWeight: '800', marginBottom: 8 }}>
                Roadmap
              </Text>
              <Text>- Page avec les perturbations TAN en temps réel</Text>
              <Text>- Page avec la liste des arrêts et horaires de ceux-ci</Text>
              <Text>- Horaires des bus/tram en temps réel et non en prévisionnel</Text>
            </View>
            <View style={styles.roadmap}>
              <Text style={{ textAlign: 'center', fontWeight: '800', marginBottom: 8 }}>FAQ</Text>
              <View style={{ ...styles.qa, marginTop: 0 }}>
                <Text style={{ fontStyle: 'italic' }}>
                  - C'est buggé ça ne marche pas c'est nul ! Remboursé!
                </Text>
                <Text>- C'est gratuit (ง'̀-'́)ง et il y a même pas de pubs</Text>
                <Text>
                  Par contre vous pouvez m'envoyer un tweet à{' '}
                  <Text style={{ fontWeight: 'bold' }}>@HyperMoonIO</Text> pour me décrire le
                  problème
                </Text>
              </View>
              <View style={styles.qa}>
                <Text style={{ fontStyle: 'italic' }}>
                  - Moi à leurs places j'aurai fait ça de telle manière sur l'application..
                </Text>
                <Text>- ♪~ ᕕ(ᐛ)ᕗ Je suis à l'écoute!</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.misc}>
          <Text style={{ textAlign: 'center' }}>Version: {manifest.version}</Text>
          <Text style={{ textAlign: 'center' }}>
            Sponsorisé par <Text style={{ fontWeight: 'bold' }}>hypermoon.io</Text>
          </Text>
          <Text style={{ textAlign: 'center' }}>Un projet open-source! ☜(˚▽˚)☞</Text>
        </View>
      </ScrollView>
    );
  }
}

export default InfoScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: '#FFF',
    flexGrow: 1,
    paddingTop: Constants.statusBarHeight + 32,
  },
  main: {
    flexGrow: 1,
    paddingLeft: 8,
    paddingRight: 8,
    maxWidth: '95%',
    alignSelf: 'center',
  },
  roadmap: {
    marginTop: 16,
  },
  misc: {
    alignSelf: 'center',
    paddingBottom: 4,
    marginTop: 32,
  },
  qa: {
    marginTop: 32,
  },
});
