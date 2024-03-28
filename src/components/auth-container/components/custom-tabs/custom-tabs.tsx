import { FC } from 'react';
import { push } from 'redux-first-history';
import { AUTH_FORM_TABS } from '@components/auth-container/constants';
import { LOGIN } from '@constants/auth/auth-constants';
import { useAppDispatch } from '@hooks/redux-hooks';
import { Paths } from '@routes/constants/router-paths';
import { Tabs } from 'antd';

import styles from './custom-tabs.module.less';

import { AuthComponentTypes } from '@/types/auth';

export const CustomTabs: FC<{ type: AuthComponentTypes }> = ({ type }) => {
    const dispatch = useAppDispatch();

    const onChange = (key: string) =>
        dispatch(push(`${Paths.AUTH_MAIN}/${key === LOGIN ? '' : key}`));

    return (
        <Tabs
            defaultActiveKey={type}
            items={AUTH_FORM_TABS}
            onChange={onChange}
            className={styles['auth-tabs']}
        />
    );
};
