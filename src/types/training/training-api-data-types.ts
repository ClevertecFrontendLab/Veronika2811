import { CurrentTraining } from '@components/calendar-custom/types/current-training';
import type { Moment } from 'moment';

import { ErrorTypeResponse } from '../error-types';
import { Nullebel } from '../nullebel';

export type TrainingParameters = {
    repeat: boolean;
    jointTraining: boolean;
    participants: string[];
    period?: number;
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
    date: string | Moment;
    exercises: Nullebel<CurrentTraining[]>;
    name?: Nullebel<string>;
    isImplementation?: boolean;
    parameters?: TrainingParameters;
};

export type TrainingEditBodyData = TrainingAddData & {
    isImplementation?: boolean;
};

export type TrainingEditData = {
    trainingId: string;
    body: TrainingEditBodyData;
};
