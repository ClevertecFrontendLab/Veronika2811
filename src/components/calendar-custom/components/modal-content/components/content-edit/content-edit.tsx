import { EditOutlined } from '@ant-design/icons';
import { TrainingTestIds } from '@components/calendar-custom/constants/training-test-id';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { trainingSlice } from '@redux/selectors';
import { setDrawerVisible } from '@redux/slice/training-slice';
import { Button, List, Typography } from 'antd';

import { EmptyCustom } from '../empty-custom';

export const ContentEdit = () => {
    const { currentTraining } = useAppSelector(trainingSlice);
    const dispatch = useAppDispatch();

    const openDrawer = () => dispatch(setDrawerVisible(true));

    if (!currentTraining) {
        return <EmptyCustom />;
    }

    return (
        <List
            bordered={false}
            dataSource={currentTraining}
            split={false}
            renderItem={(item, index) => (
                <List.Item>
                    <Typography.Text>{item.name}</Typography.Text>
                    <Button
                        type='link'
                        icon={
                            <EditOutlined
                                data-test-id={`${TrainingTestIds.MODAL_UPDATE_EDIT_BUTTON}${index}`}
                            />
                        }
                        onClick={openDrawer}
                    />
                </List.Item>
            )}
        />
    );
};
