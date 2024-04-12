import type { Moment } from 'moment';

import { TrainingResponse } from '@/types/training';

export type TitleProps = {
    date: Moment;
    closeModal: () => void;
    cellContent?: TrainingResponse[];
};

export type ModalTitleProps = TitleProps & {
    cellContent: TrainingResponse[];
};
