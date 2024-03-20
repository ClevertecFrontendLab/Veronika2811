import { CurrentTraining } from '@components/calendar-custom/types/current-training';
import type { Moment } from 'moment';

import { ErrorTypeResponse } from '../error-types';
import { Nullebel } from '../nullebel';

type TrainingParameters = {
    repeat: boolean;
    period: number;
    jointTraining: boolean;
    participants: [string];
};

export type ExercisesItem = {
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    _id?: string;
    isImplementation?: boolean;
};

export type TrainingResponse = ErrorTypeResponse & {
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: TrainingParameters;
    exercises: ExercisesItem[];
};

export type TrainingAddData = {
    name: Nullebel<string>;
    date: Moment;
    exercises: Nullebel<CurrentTraining[]>;
};

export type TrainingEditBodyData = TrainingAddData & {
    isImplementation?: boolean;
};

export type TrainingEditData = {
    trainingId: string;
    body: TrainingEditBodyData;
};
