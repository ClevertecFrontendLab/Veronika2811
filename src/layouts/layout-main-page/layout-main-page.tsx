import { Outlet } from 'react-router-dom';
import { SideBar } from '@components/side-bar';
import { ModalServerError } from '@components/ui/modal-server-error';
import { TRAINING_STATUS_ERROR } from '@constants/training/training-status-constants';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { trainingSelector } from '@redux/selectors';
import { setUserTrainingListError } from '@redux/slice/training-slice';
import { Layout } from 'antd';

import styles from './layout-main-page.module.less';

export const LayoutMainPage = () => {
    const { userTrainingListError } = useAppSelector(trainingSelector);
    const dispatch = useAppDispatch();

    const onClickCloseModal = () => dispatch(setUserTrainingListError(false));

    return (
        <Layout className={styles['page-container']}>
            <SideBar />
            <Layout className={styles['page-content']}>
                <Outlet />
                <ModalServerError
                    open={!!userTrainingListError}
                    testIds='modal-no-review'
                    statusCode={TRAINING_STATUS_ERROR}
                    onClickCloseModal={onClickCloseModal}
                />
            </Layout>
        </Layout>
    );
};
