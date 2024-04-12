import { useState } from 'react';
import { ModalNotification } from '@components/ui/modal-notification';
import { TRAINING_ERROR_SAVE } from '@constants/training/training-types-error-modal';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { inviteSelector, trainingSelector, workoutsSelector } from '@redux/selectors';
import { setCurrentTab } from '@redux/slice/workouts-slice';
import { Tabs } from 'antd';

import { WorkoutDrawer } from './components/workout/components/workout-drawer';
import { getTrainingTabs } from './utils/get-training-tabs';
import styles from './workouts-content.module.less';

export const WorkoutsContent = () => {
    const [saveTrainingError, setSaveTrainingError] = useState(false);

    const { currentTab } = useAppSelector(workoutsSelector);
    const { isDrawerVisible } = useAppSelector(trainingSelector);
    const { inviteList } = useAppSelector(inviteSelector);
    const dispatch = useAppDispatch();

    const onChange = (key: string) => dispatch(setCurrentTab(key));

    const closeModalSaveErrorTraining = () => setSaveTrainingError(false);

    const closeAllModals = () => closeModalSaveErrorTraining();

    return (
        <div className={styles[currentTab]}>
            <Tabs
                defaultActiveKey={currentTab}
                items={getTrainingTabs(inviteList.length)}
                onChange={onChange}
                className={styles['workouts-tabs']}
                centered={true}
                animated={false}
            />
            <WorkoutDrawer open={isDrawerVisible} setSaveTrainingError={setSaveTrainingError} />
            <ModalNotification
                type={TRAINING_ERROR_SAVE}
                open={saveTrainingError}
                onCancel={closeModalSaveErrorTraining}
                onClickButton={closeAllModals}
            />
        </div>
    );
};
