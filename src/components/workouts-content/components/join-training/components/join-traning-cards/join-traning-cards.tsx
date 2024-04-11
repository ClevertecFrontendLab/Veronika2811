import { useEffect, useState } from 'react';
import { push } from 'redux-first-history';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { ModalNotification } from '@components/ui/modal-notification';
import { UserCard } from '@components/workouts-content/components/user-card';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { useDeleteInviteMutation } from '@redux/api/invite.api';
import { catalogSelector, previousLocationSelector } from '@redux/selectors';
import { Button, Input, List } from 'antd';

import { sortedUsers } from '../../utils/sorted-users';

import styles from './join-traning-cards.module.less';

import { Nullebel } from '@/types/nullebel';

export const JoinTrainingCards = ({
    setShowJointList,
}: {
    setShowJointList: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
    const [deleteInvite, { isError }] = useDeleteInviteMutation();

    const previousLocations = useAppSelector(previousLocationSelector);
    const { userJoinTrainingList } = useAppSelector(catalogSelector);
    const dispatch = useAppDispatch();

    const [searchValue, setSearchValue] = useState('');
    const [deleteInviteError, setDeleteInviteError] = useState(false);

    const backToPreviousPage = () => {
        const previousRoute = previousLocations?.[1]?.location?.pathname;

        if (previousRoute) {
            dispatch(push(previousRoute));
        }
        setShowJointList(false);
    };

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

    return (
        <div className={styles.search}>
            <div className={styles['search-wrapper']}>
                <Button type='text' icon={<ArrowLeftOutlined />} onClick={backToPreviousPage}>
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
                        type='joint-cards'
                        searchValue={searchValue}
                        cancelTraining={cancelTraining}
                    />
                )}
                pagination={
                    userJoinTrainingList.length > 12 && {
                        pageSize: 12,
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
