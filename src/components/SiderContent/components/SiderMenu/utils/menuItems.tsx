import { CalendarTwoTone, HeartTwoTone, IdcardTwoTone, TrophyTwoTone } from '@ant-design/icons';

import styles from './menuItems.module.css';

export const menuItems = [
    {
        key: 'calendar',
        label: 'Календарь',
        icon: (
            <CalendarTwoTone
                className={styles['menu-icon']}
                twoToneColor={['#061178', '#061178']}
            />
        ),
    },
    {
        key: 'workout',
        label: 'Тренировки',
        icon: (
            <HeartTwoTone className={styles['menu-icon']} twoToneColor={['#061178', '#061178']} />
        ),
    },
    {
        key: 'achievements',
        icon: (
            <TrophyTwoTone className={styles['menu-icon']} twoToneColor={['#061178', '#061178']} />
        ),
        label: 'Достижения',
    },
    {
        key: 'profile',
        icon: <IdcardTwoTone className={styles['menu-icon']} twoToneColor={['#061178', 'white']} />,
        label: 'Профиль',
    },
];
