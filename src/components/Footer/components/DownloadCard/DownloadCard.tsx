import { Card, Space } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';

import { ButtonDownload } from '../ButtonDownload';

import styles from './DownloadCard.module.css';

export const DownloadCard = () => (
    <Card
        className={styles['download-card']}
        title='Скачать на телефон'
        extra='Доступно в PRO-тарифе'
        bordered={false}
        headStyle={{
            padding: '10px 22px',
            color: ' #2f54eb',
            fontWeight: 400,
            lineHeight: '130%',
        }}
        bodyStyle={{ padding: '12px 0' }}
    >
        <Space size={4} className={styles['download-card-body']}>
            <ButtonDownload icon={<AndroidFilled />} label='Android OS' />
            <ButtonDownload icon={<AppleFilled />} label='Apple iOS' />
        </Space>
    </Card>
);
