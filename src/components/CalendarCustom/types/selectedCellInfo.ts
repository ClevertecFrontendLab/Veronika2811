import { TrainingResponse } from '@/types/training/trainingApiDataTypes';

export type SelectedCellInfo = {
    cellHTMLElement: HTMLTableCellElement | HTMLDivElement;
    cellContent: TrainingResponse[];
}
