import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { workoutsSelector } from '@redux/selectors';
import { setCurrentTab } from '@redux/slice/workouts-slice';
import { Tabs } from 'antd';

import { WORKOUTS_TABS } from './constants/workouts-tabs';
import styles from './workouts-content.module.less';

export const WorkoutsContent = () => {
    const { currentTab } = useAppSelector(workoutsSelector);
    const dispatch = useAppDispatch();

    const onChange = (key: string) => dispatch(setCurrentTab(key));

    return (
        <div className={styles[currentTab]}>
            <Tabs
                defaultActiveKey={currentTab}
                items={WORKOUTS_TABS}
                onChange={onChange}
                className={styles['workouts-tabs']}
                size='large'
                destroyInactiveTabPane={true}
            />
        </div>
    );
};
