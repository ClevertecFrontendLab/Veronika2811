import React, { FC } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { BADGE_COLOR } from '@components/calendar-custom/constants/badge-color';
import { Button, Card, List, Typography } from 'antd';

import styles from './training-details.module.less';

import { Nullebel } from '@/types/nullebel';
import { TrainingCurrentEditData } from '@/types/training';

type TrainingDetailsProps = {
    record: TrainingCurrentEditData;
    setShowDetails: React.Dispatch<React.SetStateAction<Nullebel<string>>>;
    onClickEditTraining: (record: TrainingCurrentEditData) => void;
};

export const TrainingDetails: FC<TrainingDetailsProps> = ({
    record,
    setShowDetails,
    onClickEditTraining,
}) => {
    const addNewTraining = () => onClickEditTraining(record);

    return (
        <Card
            className={styles['training-details']}
            bordered={false}
            data-test-id='joint-training-review-card'
            headStyle={{
                borderBottom: `1px solid ${BADGE_COLOR[record.name]}`,
            }}
            title={
                <React.Fragment>
                    <ArrowLeftOutlined onClick={() => setShowDetails(null)} />
                    <Typography.Text>{record.name}</Typography.Text>
                </React.Fragment>
            }
            actions={[
                <Button
                    disabled={record.isImplementation}
                    size='middle'
                    block={true}
                    onClick={addNewTraining}
                >
                    Добавить упражнение
                </Button>,
            ]}
        >
            <div>
                <List
                    split={false}
                    className={styles.list}
                    dataSource={record.exercises}
                    renderItem={(item) => (
                        <List.Item>
                            <Typography.Text type='secondary'>{item.name}</Typography.Text>
                        </List.Item>
                    )}
                />
            </div>
        </Card>
    );
};
