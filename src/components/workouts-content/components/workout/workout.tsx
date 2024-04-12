import React from 'react';
import { useAppSelector } from '@hooks/redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { isArrayWithItems } from '@utils/is-array-with-items';

import { WorkoutContent } from './components/workout-content';
import { WorkoutEmpty } from './components/workout-empty';

export const Workout = () => {
    const { userTrainingList } = useAppSelector(trainingSelector);

    const isUserTrainingList = isArrayWithItems(userTrainingList);

    return (
        <React.Fragment>
            {!isUserTrainingList && <WorkoutEmpty />}
            {isUserTrainingList && <WorkoutContent />}
        </React.Fragment>
    );
};
