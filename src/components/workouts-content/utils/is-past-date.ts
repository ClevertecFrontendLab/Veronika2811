import moment, { Moment } from 'moment';

export const isPastDate = (date?: string | Moment) =>
    Boolean(date && moment(date).isBefore(moment()));
