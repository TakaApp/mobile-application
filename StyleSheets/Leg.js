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
    justifyContent: 'space-between',

    paddingLeft: 10,
    paddingRight: 10,
  },
  descriptionItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    flexShrink: 0,
    flexGrow: 1,
  },
  destination: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignSelf: 'flex-start',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    maxWidth: 500,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default styles;
