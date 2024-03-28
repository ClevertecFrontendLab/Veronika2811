import type { Moment } from 'moment';
import moment from 'moment';

export const isPastDate = (date: Moment) => {
    const today = moment();
    const isPastDay = date.isBefore(today, 'day');
    const isToday = date.isSame(today, 'day');

    return isPastDay || isToday;
};
