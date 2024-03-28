import { Marathons } from '../components/marathons';
import { Workout } from '../components/workout';

export const WORKOUTS_TABS = [
    {
        label: 'Мои тренировки',
        key: 'workouts',
        children: <Workout />,
    },
    {
        label: 'Совместные тренировки',
        key: 'joint-training',
        children: <div>Совместные тренировки</div>,
    },
    { label: 'Марафоны', key: 'marathons', children: <Marathons /> },
];
