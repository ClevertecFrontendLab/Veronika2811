import { PlusOutlined } from '@ant-design/icons';
import { useAppDispatch } from '@hooks/redux-hooks';
import { setDrawerVisible } from '@redux/slice/training-slice';
import { Button } from 'antd';

export const ButtonNewWorkout = () => {
    const dispatch = useAppDispatch();

    const openDrawer = () => dispatch(setDrawerVisible(true));

    return (
        <Button type='primary' size='large' icon={<PlusOutlined />} onClick={openDrawer}>
            Новая тренировка
        </Button>
    );
};
