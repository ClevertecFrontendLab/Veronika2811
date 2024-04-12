import { FC, useEffect, useState } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ModalNotification } from '@components/ui/modal-notification';
import { UserCard } from '@components/workouts-content/components/user-card';
import { TABLE_PAGE_SIZE } from '@components/workouts-content/constants/table-page-size';
import { TypeCards } from '@components/workouts-content/constants/type-cards';
import { useAppSelector } from '@hooks/redux-hooks';
import { useDeleteInviteMutation } from '@redux/api/invite.api';
import { catalogSelector } from '@redux/selectors';
import { Button, Input, List } from 'antd';

import { sortedUsers } from '../../utils/sorted-users';

import styles from './join-traning-cards.module.less';

import { Nullebel } from '@/types/nullebel';

type JoinTrainingCardsProps = {
    setShowJointList: React.Dispatch<React.SetStateAction<boolean>>;
};

export const JoinTrainingCards: FC<JoinTrainingCardsProps> = ({ setShowJointList }) => {
    const [deleteInvite, { isError }] = useDeleteInviteMutation();

    const { userJoinTrainingList } = useAppSelector(catalogSelector);

    const [searchValue, setSearchValue] = useState('');
    const [deleteInviteError, setDeleteInviteError] = useState(false);

    const searchHandler = (value: string) => setSearchValue(value);

    const filteredTrainingList = searchValue
        ? sortedUsers(
              userJoinTrainingList.filter((el) =>
                  el.name.toLowerCase().includes(searchValue.toLowerCase()),
              ),
          )
        : sortedUsers(userJoinTrainingList);

    const cancelTraining = async (inviteId: Nullebel<string>) => {
        try {
            await deleteInvite({ inviteId });
            setDeleteInviteError(false);
        } catch {
            setDeleteInviteError(true);
        }
    };

    useEffect(() => {
        if (isError) {
            setDeleteInviteError(true);
        }
    }, [isError]);

    const goBack = () => setShowJointList(false);

    return (
        <div className={styles.search}>
            <div className={styles['search-wrapper']}>
                <Button type='text' icon={<ArrowLeftOutlined />} onClick={goBack}>
                    Назад
                </Button>
                <Input.Search
                    placeholder='Поиск по имени'
                    onSearch={searchHandler}
                    data-test-id='search-input'
                />
            </div>
            <List
                dataSource={filteredTrainingList}
                className={styles['user-join-list']}
                renderItem={(pal, index) => (
                    <UserCard
                        pal={pal}
                        index={index}
                        type={TypeCards.JOIN_CARDS}
                        searchValue={searchValue}
                        cancelTraining={cancelTraining}
                    />
                )}
                pagination={
                    userJoinTrainingList.length > TABLE_PAGE_SIZE && {
                        pageSize: TABLE_PAGE_SIZE,
                        size: 'small',
                    }
                }
            />
            <ModalNotification
                type='training-error-save'
                open={deleteInviteError}
                onClickButton={() => setDeleteInviteError(false)}
            />
        </div>
    );
};
