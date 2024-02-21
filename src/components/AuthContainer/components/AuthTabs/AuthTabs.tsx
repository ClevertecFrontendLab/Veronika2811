import { Tabs } from 'antd';
import { push } from 'redux-first-history';

import { AUTH_FORM_TABS } from '@components/AuthContainer/constants';
import { useAppDispatch } from '@hooks/typed-react-redux-hooks';
import { AuthTypes } from '@type/auth/authTypes';
import { Paths } from '@routes/constants/Paths';
import { auth } from '@constants/index';

import styles from './AuthTabs.module.scss';

export const AuthTabs = ({ type }: { type: AuthTypes }) => {
    const dispatch = useAppDispatch();

    const onChange = (key: string) => dispatch(push(`${Paths.AUTH_MAIN}/${key !== auth.LOGIN ? key : ''}`));

    return (
        <Tabs
            defaultActiveKey={type}
            items={AUTH_FORM_TABS}
            onChange={onChange}
            className={styles['auth-tabs']}
        />
    );
};
