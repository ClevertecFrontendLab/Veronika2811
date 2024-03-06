import { CalendarTwoTone, HeartTwoTone, IdcardTwoTone } from '@ant-design/icons';

import { Paths } from '@routes/constants/Paths';

export const CARD_ACTIONS = [
    {
        key: 'schedule-workouts',
        title: ' Расписать тренировки',
        icon: <HeartTwoTone twoToneColor={['#2f54eb', '#2f54eb']} />,
        body: 'Тренировки',
        pathRedirect: '',
    },
    {
        key: 'assign-calendar',
        title: 'Назначить календарь',
        icon: <CalendarTwoTone twoToneColor={['#2f54eb', '#2f54eb']} />,
        body: 'Календарь',
        pathRedirect: Paths.CALENDAR,
    },
    {
        key: 'fill-profile',
        title: 'Заполнить профиль',
        icon: <IdcardTwoTone twoToneColor={['#2f54eb', '#ffffff']} />,
        body: 'Профиль',
        pathRedirect: '',
    },
];
