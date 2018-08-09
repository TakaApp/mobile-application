import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  illustration: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  description: {
    flex: 7,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingLeft: 10,
    paddingRight: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: 500,
  },
});

export default styles;
