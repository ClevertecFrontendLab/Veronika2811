import type { Moment } from 'moment';

import { TrainingResponse } from '@/types/training/trainingApiDataTypes';

export type TitleProps = {
    date: Moment;
    closeModal: () => void;
    cellContent?: TrainingResponse[];
};

export type ModalTitleProps = TitleProps & {
    cellContent: TrainingResponse[];
};
