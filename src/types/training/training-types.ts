type EditTrainingType = 'future-training' | 'past-training';

export type EditTrainingInfo = {
    type: EditTrainingType;
    id: string;
} | null;
