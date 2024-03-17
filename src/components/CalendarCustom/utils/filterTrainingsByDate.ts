import type { Moment } from 'moment';
import moment from 'moment';

import { DATE_FORMAT } from '../constants/dateFormat';

import { TrainingResponse } from '@/types/training/trainingApiDataTypes';

export const filterTrainingsByDate = (userTrainingListData: TrainingResponse[], currentDate: Moment) => {
    return userTrainingListData?.filter(({ date }) => {
        const cellDate = currentDate.format(DATE_FORMAT);
        const trainingDate = moment(date).format(DATE_FORMAT);

        return cellDate === trainingDate;
    });
}
