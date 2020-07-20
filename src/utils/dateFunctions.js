import moment from 'moment';

export const today = () => Date.now();

export const epochToDateField = date => moment(date).format('YYYY-MM-DD');

/* getTime() returns one day offset thats why sum 86400000*/
export const dateFieldToEpoch = date => new Date(date).getTime() + 86400000;
