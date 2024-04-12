import { FC, useState } from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';

import { InvitionItem } from './components/invition-item';
import styles from './joint-training-invitations-list.module.less';

import { InviteResponse } from '@/types/invite';

type JointTrainingInvitationsListProps = {
    setShowListPals: React.Dispatch<React.SetStateAction<boolean>>;
    inviteList: InviteResponse[];
};

export const JointTrainingInvitationsList: FC<JointTrainingInvitationsListProps> = ({
    setShowListPals,
    inviteList,
}) => {
    const [invitationListCollapsed, setInvitationListCollapsed] = useState(true);

    const invitationList = invitationListCollapsed ? [inviteList[0]] : inviteList;

    const onClickInvitationListCollapsed = () =>
        setInvitationListCollapsed(!invitationListCollapsed);

    return (
        <div className={styles.invitation}>
            <Typography.Paragraph type='secondary'>
                Новое сообщение&nbsp;&nbsp;({inviteList.length})
            </Typography.Paragraph>
            <div className={styles['invitation-list']}>
                {invitationList.map((invite) => (
                    <InvitionItem invite={invite} setShowListPals={setShowListPals} />
                ))}
            </div>
            {inviteList.length > 1 && (
                <Button
                    type='text'
                    className={styles['button-collapsed']}
                    icon={invitationListCollapsed ? <DownOutlined /> : <UpOutlined />}
                    onClick={onClickInvitationListCollapsed}
                >
                    {invitationListCollapsed ? 'Показать все сообщения' : 'Скрыть все сообщения'}
                </Button>
            )}
        </div>
    );
};
