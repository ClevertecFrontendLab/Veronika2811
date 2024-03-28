import { push } from 'redux-first-history';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { previousLocationSelector } from '@redux/selectors';
import { Button } from 'antd';

import styles from './settings-header.module.less';

export const SettingsHeader = () => {
    const previousLocations = useAppSelector(previousLocationSelector);
    const dispatch = useAppDispatch();

    const backToPreviousPage = () => {
        const previousRoute = previousLocations?.[1]?.location?.pathname;

        if (previousRoute) {
            dispatch(push(previousRoute));
        }
    };

    return (
        <div className={styles['settings-header']}>
            <Button
                type='text'
                icon={<ArrowLeftOutlined />}
                data-test-id='settings-back'
                onClick={backToPreviousPage}
            >
                Настройки
            </Button>
        </div>
    );
};
