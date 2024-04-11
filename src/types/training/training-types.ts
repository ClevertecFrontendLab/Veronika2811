import { EditTrainingType } from '@constants/training/edit-training-types';

import { Nullebel } from '../nullebel';

import { TrainingResponse } from './training-api-data-types';

type EditTrainingTypeItems = typeof EditTrainingType.FUTURE | typeof EditTrainingType.PAST;

export type EditTrainingInfo = Nullebel<{
    type: EditTrainingTypeItems;
    id: string;
}>;

export type TrainingCurrentEditData = TrainingResponse & {
    key: string;
    typeWorkout: string;
};
