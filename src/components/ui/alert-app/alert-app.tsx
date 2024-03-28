import { FC } from 'react';
import { createPortal } from 'react-dom';
import { useAppDispatch } from '@hooks/redux-hooks';
import { setAlertApp } from '@redux/slice/main-slice';
import { Alert, AlertProps } from 'antd';

import styles from './alert-app.module.less';

type AlertAppProps = {
    message: string;
    type: AlertProps['type'];
    testIds: string;
    container?: Element | DocumentFragment;
};

export const AlertApp: FC<AlertAppProps> = ({ message, type, testIds, container }) => {
    const dispatch = useAppDispatch();

    const onCloseAlert = () => dispatch(setAlertApp(null));

    return createPortal(
        <div className={styles['alert-container']}>
            <Alert
                type={type}
                message={message}
                closable={true}
                showIcon={true}
                onClose={onCloseAlert}
                className={styles.alert}
                data-test-id={testIds}
            />
        </div>,
        container || document.body,
    );
};
