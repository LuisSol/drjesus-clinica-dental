import moment from 'moment';

export const today = () => Date.now();

export const epochToDateField = date => moment(date).format('YYYY-MM-DD');

/* getTime() returns an offset of 21600000ms*/
export const dateFieldToEpoch = date => new Date(date).getTime() + 21600000;
