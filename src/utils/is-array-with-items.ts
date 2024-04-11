import { CatalogTrainingPalsResponse } from '@/types/catalogs';
import { FeedbackResponse } from '@/types/feedbacks';
import { InviteResponse } from '@/types/invite';
import { ExercisesItem, TrainingResponse } from '@/types/training';

export const isArrayWithItems = (
    array:
        | ExercisesItem[]
        | TrainingResponse[]
        | CatalogTrainingPalsResponse[]
        | InviteResponse[]
        | FeedbackResponse[],
) => !!array.length;
