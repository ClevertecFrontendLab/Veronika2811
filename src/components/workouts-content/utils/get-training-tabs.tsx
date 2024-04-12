import React from 'react';
import { Badge } from 'antd';

import { JoinTraining } from '../components/join-training';
import { Marathons } from '../components/marathons';
import { Workout } from '../components/workout';

export const getTrainingTabs = (count: number) => [
    {
        label: 'Мои тренировки',
        key: 'workouts',
        children: <Workout />,
    },
    {
        label: count ? (
            <React.Fragment>
                <span>Совместные тренировки</span>
                <Badge count={count} />
            </React.Fragment>
        ) : (
            'Совместные тренировки'
        ),
        key: 'joint-training',
        children: <JoinTraining />,
    },
    { label: 'Марафоны', key: 'marathons', children: <Marathons /> },
];
