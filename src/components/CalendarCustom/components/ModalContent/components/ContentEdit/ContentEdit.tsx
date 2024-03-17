import { Button, List, Typography } from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { TrainingTestIds } from '@components/CalendarCustom/constants/trainingTestId';

import { EmptyCustom } from '../EmptyCustom';

import { currentTrainingSelector } from '@redux/selectors';
import { setDrawerVisible } from '@redux/slice/trainingSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';

export const ContentEdit = () => {
    const currentTraining = useAppSelector(currentTrainingSelector);
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
