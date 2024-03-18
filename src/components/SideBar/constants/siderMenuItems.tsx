import { CalendarTwoTone, HeartTwoTone, IdcardOutlined, TrophyTwoTone } from '@ant-design/icons';

import { MENU_KEYS } from '@constants/main/menuKeys';

export const SIDER_MENU_ITEMS = [
    {
        key: MENU_KEYS.calendar,
        label: 'Календарь',
        icon: <CalendarTwoTone />,
    },
    {
        key: MENU_KEYS.workouts,
        label: 'Тренировки',
        icon: <HeartTwoTone />,
    },
    {
        key: MENU_KEYS.achievements,
        label: 'Достижения',
        icon: <TrophyTwoTone />,
    },
    {
        key: MENU_KEYS.profile,
        label: 'Профиль',
        icon: <IdcardOutlined />,
    },
];
