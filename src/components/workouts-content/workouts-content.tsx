import { Tabs } from 'antd';

import { WORKOUTS_TABS } from './constants/workouts-tabs';
import styles from './workouts-content.module.less';

export const WorkoutsContent = () => {
    const onChange = (key: string) => console.log(key);

    return (
        <div className={styles.workouts}>
            <Tabs
                defaultActiveKey='workout'
                items={WORKOUTS_TABS}
                onChange={onChange}
                className={styles['workouts-tabs']}
                size='large'
            />
        </div>
    );
};
