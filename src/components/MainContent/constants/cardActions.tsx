import { CalendarTwoTone, HeartTwoTone, IdcardTwoTone } from '@ant-design/icons';

export const CARD_ACTIONS = [
    {
        key: 'schedule-workouts',
        title: ' Расписать тренировки',
        icon: <HeartTwoTone twoToneColor={['#2f54eb', '#2f54eb']} />,
        body: 'Тренировки',
    },
    {
        key: 'assign-calendar',
        title: 'Назначить календарь',
        icon: <CalendarTwoTone twoToneColor={['#2f54eb', '#2f54eb']} />,
        body: 'Календарь',
    },
    {
        key: 'fill-profile',
        title: 'Заполнить профиль',
        icon: <IdcardTwoTone twoToneColor={['#2f54eb', '#ffffff']} />,
        body: 'Профиль',
    },
];
