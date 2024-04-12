import { CalendarTwoTone, HeartTwoTone, IdcardOutlined, TrophyTwoTone } from '@ant-design/icons';
import { MENU_KEYS } from '@constants/main/menu-keys';
import { Badge } from 'antd';

import { InviteResponse } from '@/types/invite';

export const getSiderMenuItems = (inviteList: InviteResponse[]) => [
    {
        key: MENU_KEYS.calendar,
        label: 'Календарь',
        icon: <CalendarTwoTone />,
    },
    {
        key: MENU_KEYS.workouts,
        label: 'Тренировки',
        icon: (
            <Badge
                data-test-id='notification-about-joint-training'
                count={inviteList.length}
                style={{ margin: '0' }}
            >
                <HeartTwoTone />
            </Badge>
        ),
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
