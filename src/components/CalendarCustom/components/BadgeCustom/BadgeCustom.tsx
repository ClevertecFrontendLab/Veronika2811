import { Badge } from 'antd';

import { BADGE_COLOR } from '@components/CalendarCustom/constants/badgeColor';

export const BadgeCustom = ({ name }: { name: string }) => {
    const colorBadge = BADGE_COLOR[name] || '#EB2F96';

    return <Badge color={colorBadge} text={name} />;
};
