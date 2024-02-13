import { Col, Layout, Row } from 'antd';

import { ButtonText } from './components/ButtonText';
import { DownloadCard } from './components/DownloadCard';

import styles from './MainFooter.module.css';

const { Footer } = Layout;

export const MainFooter = () => {
    return (
        <Footer className={styles.footer}>
            <Row align='bottom' justify='space-between' gutter={[0, 28]}>
                <Col xs={{ order: 2 }} sm={{ order: 1 }}>
                    <ButtonText />
                </Col>
                <Col xs={{ order: 1 }} sm={{ order: 2 }}>
                    <DownloadCard />
                </Col>
            </Row>
        </Footer>
    );
};
