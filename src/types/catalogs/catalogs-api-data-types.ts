import { Nullebel } from '../nullebel';

export type CatalogTrainingListResponse = {
    name: string;
    key: string;
};

export type Periods = {
    cost: number;
    days: number;
    text: string;
};

export type CatalogTariffListResponse = {
    _id: string;
    name: string;
    periods: Periods[];
};

export type CatalogTrainingPalsResponse = {
    id: string;
    name: string;
    trainingType: string;
    imageSrc: string;
    avgWeightInWeek: number;
    status: Nullebel<string>;
    inviteId: Nullebel<string>;
};

export type JointTrainingParticipantsQuery = {
    trainingType?: string;
    status?: Nullebel<string>;
};
