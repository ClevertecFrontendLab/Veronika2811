import { Col, Layout, Row } from 'antd';

import { ButtonSeeReviews, DownloadCard } from './components';
import styles from './main-footer.module.less';

const { Footer } = Layout;

export const MainFooter = () => (
    <Footer className={styles.footer}>
        <Row align='bottom' justify='space-between' gutter={[0, 28]}>
            <Col xs={{ order: 2 }} sm={{ order: 1 }}>
                <ButtonSeeReviews />
            </Col>
            <Col xs={{ order: 1 }} sm={{ order: 2 }}>
                <DownloadCard />
            </Col>
        </Row>
    </Footer>
);
