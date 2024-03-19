import React from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { BadgeCustom } from '@components/calendar-custom/components/badge-custom';
import { useAppSelector } from '@hooks/redux-hooks';
import { editTrainingSelector, typeTrainingSelector } from '@redux/selectors';
import { Typography } from 'antd';

import styles from './drawer-title.module.less';

export const DrawerTitle = ({ date }: { date: string }) => {
    const typeTraining = useAppSelector(typeTrainingSelector);
    const editTraining = useAppSelector(editTrainingSelector);

    const drawerTitle = editTraining ? 'Редактирование' : 'Добавление упражнений';

    return (
        <React.Fragment>
            <div className={styles['drawer-title']}>
                {editTraining ? <EditOutlined /> : <PlusOutlined />}
                <Typography.Text>{drawerTitle}</Typography.Text>
            </div>
            <div className={styles['drawer-subtitle']}>
                {typeTraining && <BadgeCustom name={typeTraining} />}
                <Typography.Paragraph className='date'>{date}</Typography.Paragraph>
            </div>
        </React.Fragment>
    );
};
