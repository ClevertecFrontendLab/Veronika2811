import { Layout } from 'antd';

import { CardAdvantages, CardDescription, CardActions } from './components';

import styles from './MainContent.module.scss';

const { Content } = Layout;

export const MainContent = () => (
    <Content className={styles['content']}>
        <CardAdvantages />
        <CardDescription />
        <CardActions />
    </Content>
);
