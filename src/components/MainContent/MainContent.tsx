import { Layout } from 'antd';

import { CardAdvantages } from './components/CardAdvantages';
import { CardDescription } from './components/CardDesciption';
import { CardActions } from './components/CardActions';

import styles from './MainContent.module.css';

const { Content } = Layout;

export const MainContent = () => {
    return (
        <Content className={styles['content']}>
            <CardAdvantages />
            <CardDescription />
            <CardActions />
        </Content>
    );
};
