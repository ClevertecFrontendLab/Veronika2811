import { TrainingResponse } from '@/types/training/training-api-data-types';

export type SelectedCellInfo = {
    cellHTMLElement: HTMLTableCellElement | HTMLDivElement;
    cellContent: TrainingResponse[];
};
