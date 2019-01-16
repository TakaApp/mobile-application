import { AsyncStorage } from 'react-native';
import { Analytics, PageHit, Event } from 'expo-analytics';
import uuidv4 from 'uuid/v4';

let analytics;
export const init = async () => {
  let uid = await AsyncStorage.getItem('uid');

  if (!uid) {
    uid = uuidv4();
    await AsyncStorage.setItem('uid', uid);
  }
  analytics = new Analytics('UA-117756242-2', {
    uid,
  });
};

export const page = p => {
  if (!analytics) return;

  analytics.hit(new PageHit(p));
};

export const event = (category, option, label, value) => {
  if (!analytics) return;

  analytics.event(new Event(category, option, label, value));
};

export default {
  page,
  event,
};
