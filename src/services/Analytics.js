import { Analytics, PageHit } from 'expo-analytics';

const analytics = new Analytics('UA-117756242-2');

export const page = p => {
  analytics.hit(new PageHit(p));
};

export default {
  page,
};
