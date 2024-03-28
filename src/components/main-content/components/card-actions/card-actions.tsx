import { CARD_ACTIONS } from '@components/main-content/constants/card-actions';
import { Col, Row } from 'antd';

import { CardActionItem } from '../card-action-item';

export const CardActions = () => (
    <Row gutter={[16, 5]}>
        {CARD_ACTIONS.map((item) => (
            <Col xs={{ span: 24 }} sm={{ span: 8 }} key={`card-action-${item.key}`}>
                <CardActionItem item={item} />
            </Col>
        ))}
    </Row>
);
