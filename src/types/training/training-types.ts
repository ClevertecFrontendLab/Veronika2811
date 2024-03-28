import { Nullebel } from '../nullebel';

type EditTrainingType = 'future-training' | 'past-training';

export type EditTrainingInfo = Nullebel<{
    type: EditTrainingType;
    id: string;
}>;
