import { isArrayWithItems } from '@utils/is-array-with-items';

import { TrainingResponse } from '@/types/training';

enum Trainings {
    'Ноги' = 'legs',
    'Руки' = 'hands',
    'Силовая' = 'strength',
    'Спина' = 'back',
    'Грудь' = 'chest',
}

export const getPopularTypeTraining = (trainings: TrainingResponse[]) => {
    const result: Record<string, number> = {};

    const trainigsList = Object.values(trainings);

    trainigsList.forEach(({ name, exercises }) => {
        const isExercisesWithItem = isArrayWithItems(exercises);

        if (isExercisesWithItem) {
            exercises.forEach((exercise) => {
                const { replays, weight, approaches } = exercise;

                const value = replays * weight * approaches;

                result[name] = value;
            });
        }
    });

    const [key] = Object.entries(result).sort((a, b) => b[1] - a[1])[0];

    return Trainings[key as keyof typeof Trainings];
};
