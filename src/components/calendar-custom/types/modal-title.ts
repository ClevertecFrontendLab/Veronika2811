import type { Moment } from 'moment';

import { TrainingResponse } from '@/types/training/training-api-data-types';

export type TitleProps = {
    date: Moment;
    closeModal: () => void;
    cellContent?: TrainingResponse[];
};

export type ModalTitleProps = TitleProps & {
    cellContent: TrainingResponse[];
};
