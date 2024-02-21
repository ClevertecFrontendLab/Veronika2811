import { CalendarTwoTone, HeartTwoTone, IdcardTwoTone, TrophyTwoTone } from '@ant-design/icons';

export const MENU_ITEMS = [
    {
        key: 'calendar',
        label: 'Календарь',
        icon: <CalendarTwoTone twoToneColor={['#061178', '#061178']} />,
    },
    {
        key: 'workout',
        label: 'Тренировки',
        icon: <HeartTwoTone twoToneColor={['#061178', '#061178']} />,
    },
    {
        key: 'achievements',
        icon: <TrophyTwoTone twoToneColor={['#061178', '#061178']} />,
        label: 'Достижения',
    },
    {
        key: 'profile',
        icon: <IdcardTwoTone twoToneColor={['#061178', '#ffffff']} />,
        label: 'Профиль',
    },
];
