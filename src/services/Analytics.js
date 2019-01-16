import { Analytics, PageHit, Event } from 'expo-analytics';

const analytics = new Analytics('UA-117756242-2');

export const page = p => {
  analytics.hit(new PageHit(p));
};

export const event = (category, option, label, value) => {
  analytics.event(new Event(category, option, label, value));
};

export default {
  page,
  event,
};
