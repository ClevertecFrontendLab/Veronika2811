import {
    CalendarTwoTone,
    HeartTwoTone,
    IdcardTwoTone,
    TrophyTwoTone,
    TwoToneColor,
} from '@ant-design/icons';

const primaryColor = '#061178';
const secondaryColor = '#ffffff';

const iconColors: TwoToneColor = [primaryColor, primaryColor];
const iconColorsProfile: TwoToneColor = [primaryColor, secondaryColor];

export const SIDER_MENU_ITEMS = [
    {
        key: 'calendar',
        label: 'Календарь',
        icon: <CalendarTwoTone twoToneColor={iconColors} />,
    },
    {
        key: 'workout',
        label: 'Тренировки',
        icon: <HeartTwoTone twoToneColor={iconColors} />,
    },
    {
        key: 'achievements',
        label: 'Достижения',
        icon: <TrophyTwoTone twoToneColor={iconColors} />,
    },
    {
        key: 'profile',
        label: 'Профиль',
        icon: <IdcardTwoTone twoToneColor={iconColorsProfile} />,
    },
];
