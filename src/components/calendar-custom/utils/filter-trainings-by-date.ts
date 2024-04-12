import type { Moment } from 'moment';
import moment from 'moment';

import { DATE_FORMAT } from '../../../constants/date-format';

import { TrainingResponse } from '@/types/training';

export const filterTrainingsByDate = (
    userTrainingListData: TrainingResponse[],
    currentDate: Moment,
) => {
    if (Array.isArray(userTrainingListData)) {
        return userTrainingListData.filter(({ date }) => {
            const cellDate = currentDate.format(DATE_FORMAT);
            const trainingDate = moment(date).format(DATE_FORMAT);

            return cellDate === trainingDate;
        });
    }

    return userTrainingListData;
};
