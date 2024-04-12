import React, { FC, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { DrawerCustom } from '@components/ui/drawer-custom';
import { useAppDispatch } from '@hooks/redux-hooks';
import {
    setDrawerVisible,
    setEditMode,
    setEditTraining,
    setEditTrainingData,
} from '@redux/slice/training-slice';
import { Button, Form } from 'antd';

import { WorkoutDrawerTitle } from './components/workout-drawer-title';
import { WorkoutFooter } from './components/workout-footer';
import { WorkoutForm } from './components/workout-form';
import styles from './workout-drawer.module.less';

type WorkoutDrawerProps = {
    open: boolean;
    setSaveTrainingError: React.Dispatch<React.SetStateAction<boolean>>;
};

export const WorkoutDrawer: FC<WorkoutDrawerProps> = ({ open, setSaveTrainingError }) => {
    const [form] = Form.useForm();

    const [disabledButton, setDisabledButton] = useState(true);

    const dispatch = useAppDispatch();

    const onCloseDrawer = () => {
        dispatch(setDrawerVisible(false));
        dispatch(setEditMode(false));
        dispatch(setEditTrainingData(null));
        dispatch(setEditTraining(null));
        setDisabledButton(true);

        form.resetFields();
    };

    return (
        <DrawerCustom
            testIds='modal-drawer-right'
            onClose={onCloseDrawer}
            open={open}
            closable={false}
            title={<WorkoutDrawerTitle />}
            footer={<WorkoutFooter disabled={disabledButton} />}
            extra={
                <Button
                    key='submit-drawer-form-workout'
                    size='small'
                    type='text'
                    icon={<CloseOutlined className='drawer-close-icon' />}
                    onClick={onCloseDrawer}
                    data-test-id='modal-drawer-right-button-close'
                />
            }
            className={styles.drawer}
        >
            <WorkoutForm
                form={form}
                setSaveTrainingError={setSaveTrainingError}
                setDisabledButton={setDisabledButton}
                onCloseDrawer={onCloseDrawer}
            />
        </DrawerCustom>
    );
};
