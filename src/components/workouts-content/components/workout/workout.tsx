import React from 'react';
import { useAppSelector } from '@hooks/redux-hooks';
import { trainingSelector } from '@redux/selectors';

import { WorkoutContent } from './components/workout-content';
import { WorkoutEmpty } from './components/workout-empty';

export const Workout = () => {
    const { userTrainingList } = useAppSelector(trainingSelector);

    return (
        <React.Fragment>
            {!userTrainingList.length && <WorkoutEmpty />}
            {!!userTrainingList.length && <WorkoutContent />}
        </React.Fragment>
    );
};
