import { EditTrainingType } from '@constants/training/edit-training-types';

export const checkIsPastTraining = (type?: string) => type === EditTrainingType.PAST;
