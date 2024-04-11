import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useAppSelector } from '@hooks/redux-hooks';
import { trainingSelector, workoutsSelector } from '@redux/selectors';
import { Typography } from 'antd';

import styles from './workout-drawer-title.module.less';

export const WorkoutDrawerTitle = () => {
    const { editTraining } = useAppSelector(trainingSelector);
    const { selectedUser } = useAppSelector(workoutsSelector);

    const getDrawerTitle = () => {
        if (selectedUser) return 'Совместная тренировка';

        if (editTraining) return 'Редактирование';

        return 'Добавление упражнений';
    };

    return (
        <div className={styles['workout-drawer-title']}>
            {editTraining ? <EditOutlined /> : <PlusOutlined />}
            <Typography.Title level={4}>{getDrawerTitle()}</Typography.Title>
        </div>
    );
};
