import moment from 'moment';

export const hour = x => moment(x).format('HH:mm');

export const secondsToMinutes = x => Math.round(x / 60);
export const secondsToMinutesF = x => `${secondsToMinutes(x)} min`;
