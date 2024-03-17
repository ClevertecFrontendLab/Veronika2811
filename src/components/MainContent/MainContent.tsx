import { Layout } from 'antd';

import { CardActions,CardAdvantages, CardDescription } from './components';

import styles from './MainContent.module.less';

const { Content } = Layout;

export const MainContent = () => (
    <Content className={styles['content']}>
        <CardAdvantages />
        <CardDescription />
        <CardActions />
    </Content>
);
