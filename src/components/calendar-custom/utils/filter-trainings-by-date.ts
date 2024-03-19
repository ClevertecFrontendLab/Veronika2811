import type { Moment } from 'moment';
import moment from 'moment';

import { DATE_FORMAT } from '../constants/date-format';

import { TrainingResponse } from '@/types/training/training-api-data-types';

export const filterTrainingsByDate = (
    userTrainingListData: TrainingResponse[],
    currentDate: Moment,
) =>
    userTrainingListData?.filter(({ date }) => {
        const cellDate = currentDate.format(DATE_FORMAT);
        const trainingDate = moment(date).format(DATE_FORMAT);

        return cellDate === trainingDate;
    });
