import { useAppDispatch } from '@hooks/redux-hooks';
import { setDrawerVisible } from '@redux/slice/training-slice';
import { Button, Typography } from 'antd';

import styles from './workout-empty.module.less';

export const WorkoutEmpty = () => {
    const dispatch = useAppDispatch();

    const openWorkoutDrawer = () => dispatch(setDrawerVisible(true));

    return (
        <div className={styles['workout-empty']}>
            <Typography.Title level={3}>У вас ещё нет созданных тренировок</Typography.Title>
            <Button type='primary' size='large' onClick={openWorkoutDrawer}>
                Создать тренировку
            </Button>
        </div>
    );
};
