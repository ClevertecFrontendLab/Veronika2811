import { push } from 'redux-first-history';
import { Tabs } from 'antd';

import { AUTH_FORM_TABS } from '@components/AuthContainer/constants';

import { useAppDispatch } from '@hooks/reduxHooks';
import { Paths } from '@routes/constants/Paths';
import { AuthComponentTypes } from '@/types/auth';
import { LOGIN } from '@constants/auth/authConstants';

import styles from './CustomTabs.module.scss';

export const CustomTabs = ({ type }: { type: AuthComponentTypes }) => {
    const dispatch = useAppDispatch();

    const onChange = (key: string) =>
        dispatch(push(`${Paths.AUTH_MAIN}/${key !== LOGIN ? key : ''}`));

    return (
        <Tabs
            defaultActiveKey={type}
            items={AUTH_FORM_TABS}
            onChange={onChange}
            className={styles['auth-tabs']}
        />
    );
};
