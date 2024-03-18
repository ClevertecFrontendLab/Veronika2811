import type { Moment } from 'moment';

import { CurrentTraining } from '@components/CalendarCustom/types/currentTraining';

import { ErrorTypes } from '../errorTypes';

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

export type TrainingResponse = ErrorTypes & {
    _id: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId: string;
    parameters: TrainingParameters;
    exercises: ExercisesItem[];
};

export type TrainingEditData = {
    name: string | null;
    date: Moment;
    exercises: CurrentTraining[] | null;
    isImplementation?: boolean;
};
