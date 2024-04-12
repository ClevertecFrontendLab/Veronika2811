import { TrainingResponse } from '@/types/training';

export type SelectedCellInfo = {
    cellHTMLElement: HTMLTableCellElement | HTMLDivElement;
    cellContent: TrainingResponse[];
};
