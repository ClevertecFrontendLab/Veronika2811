import { CalendarTwoTone, HeartTwoTone, IdcardTwoTone } from '@ant-design/icons';
import { MENU_KEYS } from '@constants/main/menu-keys';
import { Paths } from '@routes/constants/router-paths';

export const CARD_ACTIONS = [
    {
        key: MENU_KEYS.workouts,
        title: ' Расписать тренировки',
        icon: <HeartTwoTone twoToneColor={['#2f54eb', '#2f54eb']} />,
        body: 'Тренировки',
        pathRedirect: '',
        testIds: '',
    },
    {
        key: MENU_KEYS.calendar,
        title: 'Назначить календарь',
        icon: <CalendarTwoTone twoToneColor={['#2f54eb', '#2f54eb']} />,
        body: 'Календарь',
        pathRedirect: Paths.CALENDAR,
        testIds: 'menu-button-calendar',
    },
    {
        key: MENU_KEYS.profile,
        title: 'Заполнить профиль',
        icon: <IdcardTwoTone twoToneColor={['#2f54eb', '#ffffff']} />,
        body: 'Профиль',
        pathRedirect: '',
        testIds: '',
    },
];
