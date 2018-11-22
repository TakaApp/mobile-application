import React, { Component } from 'react';
import T from 'prop-types';

import { Text } from 'react-native';

class Place extends Component {
  render() {
    const { data } = this.props;
    return (
      <Text style={{ fontWeight: '700' }}>
        {data.name.toLowerCase() === 'origin' ? 'Point de départ' : data.name}
      </Text>
    );
  }
}

Place.propTypes = {
  data: T.object.isRequired,
};

export default Place;
