import { CalendarTwoTone, HeartTwoTone, IdcardTwoTone } from '@ant-design/icons';

export const CARD_ACTIONS = [
    {
        key: 1,
        title: ' Расписать тренировки',
        icon: <HeartTwoTone twoToneColor={['#2f54eb', '#2f54eb']} />,
        body: 'Тренировки',
    },
    {
        key: 2,
        title: 'Назначить календарь',
        icon: <CalendarTwoTone twoToneColor={['#2f54eb', '#2f54eb']} />,
        body: 'Календарь',
    },
    {
        key: 3,
        title: 'Заполнить профиль',
        icon: <IdcardTwoTone twoToneColor={'#2f54eb'} />,
        body: 'Профиль',
    },
];
