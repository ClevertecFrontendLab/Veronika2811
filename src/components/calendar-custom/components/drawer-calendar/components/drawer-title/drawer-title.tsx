import React, { FC } from 'react';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { BadgeCustom } from '@components/calendar-custom/components/badge-custom';
import { useAppSelector } from '@hooks/redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { Typography } from 'antd';

import styles from './drawer-title.module.less';

export const DrawerTitle: FC<{ date: string }> = ({ date }) => {
    const { typeTraining, editTraining } = useAppSelector(trainingSelector);

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
