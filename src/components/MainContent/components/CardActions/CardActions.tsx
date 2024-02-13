import { Col, Row } from 'antd';

import { CardActionItem } from '../CardActionItem';
import { CARD_ACTIONS } from '@components/MainContent/constants/cardActions';

export const CardActions = () => {
    return (
        <Row gutter={[16, 5]}>
            {CARD_ACTIONS.map((item) => {
                return (
                    <Col xs={{ span: 24 }} sm={{ span: 8 }} key={item.key}>
                        <CardActionItem item={item} />
                    </Col>
                );
            })}
        </Row>
    );
};
