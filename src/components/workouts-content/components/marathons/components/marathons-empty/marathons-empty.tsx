import { Space, Typography } from 'antd';

import styles from './marathons-empty.module.less';

const { Title, Paragraph } = Typography;

export const MarathonsEmpty = () => (
    <Space className={styles['marathons-empty']} align='center' direction='vertical' size={48}>
        <Title level={3} className='marathons-empty-title'>
            В данный период
            <br />
            ни один марафон не проводится
        </Title>
        <Paragraph>
            Заглядывайте сюда почаще
            <br />
            и ваш первый марафон скоро начнется.
        </Paragraph>
    </Space>
);
