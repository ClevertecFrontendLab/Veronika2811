import { FC } from 'react';
import { BADGE_COLOR } from '@components/calendar-custom/constants/badge-color';
import { Badge } from 'antd';

export const BadgeCustom: FC<{ name: string }> = ({ name }) => {
    const colorBadge = BADGE_COLOR[name] || '#EB2F96';

    return <Badge color={colorBadge} text={name} />;
};
