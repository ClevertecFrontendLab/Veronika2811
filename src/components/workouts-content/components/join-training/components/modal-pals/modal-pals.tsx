import { FC } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import { ModalCustom } from '@components/ui/modal-custom';
import { UserMetaCard } from '@components/workouts-content/components/user-meta-card';
import { useAppSelector } from '@hooks/redux-hooks';
import { useBreakpoints } from '@hooks/use-breakpoints';
import { workoutsSelector } from '@redux/selectors';
import { Button, Col, Row, Typography } from 'antd';

import styles from './modal-pals.module.less';

import { Nullebel } from '@/types/nullebel';

type ModalPalsProps = {
    open: boolean;
    onClose: () => void;
    cancelTraining: (inviteId: Nullebel<string>) => Promise<void>;
};

export const ModalPals: FC<ModalPalsProps> = ({ open, onClose, cancelTraining }) => {
    const { isXs } = useBreakpoints();

    const { selectedUser } = useAppSelector(workoutsSelector);

    if (!selectedUser) return null;

    const { imageSrc, name, trainingType, avgWeightInWeek, inviteId } = selectedUser;

    const onClickCancelTraining = () => cancelTraining(inviteId);

    return (
        <ModalCustom
            open={open}
            closable={true}
            testIds='partner-modal'
            className={styles['modal-pals']}
            onCancel={onClose}
            width={isXs ? 312 : 539}
        >
            <Row>
                <Col span={13} className='modal-user-info'>
                    <UserMetaCard avatorSrc={imageSrc} name={name} />
                </Col>
                <Col xs={{ span: 24 }} sm={{ span: 11 }} className={styles.training}>
                    <Col xs={{ span: 10 }} sm={{ span: 14 }} className={styles['training-type']}>
                        <Typography.Paragraph type='secondary'>
                            Тип тренировки:
                        </Typography.Paragraph>
                        <Typography.Paragraph type='secondary'>
                            Средняя нагрузка:
                        </Typography.Paragraph>
                    </Col>
                    <Col xs={{ span: 14 }} sm={{ span: 10 }} className={styles['training-info']}>
                        <Typography.Paragraph>{trainingType}</Typography.Paragraph>
                        <Typography.Paragraph>{avgWeightInWeek} кг/нед</Typography.Paragraph>
                    </Col>
                </Col>
            </Row>
            <Row className='modal-status-block'>
                <Col xs={{ span: 24, order: 2 }} sm={{ span: 13, order: 0 }} className='status'>
                    <Typography.Text>тренировка одобрена</Typography.Text>
                    <CheckCircleFilled />
                </Col>
                <Col xs={{ span: 24, order: 1 }} sm={{ span: 11, order: 0 }}>
                    <Button size='large' block={true} onClick={onClickCancelTraining}>
                        Отменить тренировку
                    </Button>
                </Col>
            </Row>
        </ModalCustom>
    );
};
