import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';

import { BreadcrumbCustom } from '@components/BreadcrumbCustom';
import { SideBar } from '@components/SideBar';
import { Loader } from '@components/ui/Loader';
import { ModalServerError } from '@components/ui/ModalServerError';

import { isLoadingSelector, userTrainingListErrorSelector } from '@redux/selectors';
import { setUserTrainingListError } from '@redux/slice/trainingSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { TRAINING_STATUS_ERROR } from '@constants/training/trainingStatusConstants';

import styles from './LayoutMainPage.module.less';

export const LayoutMainPage = () => {
    const isLoading = useAppSelector(isLoadingSelector);
    const userTrainingListError = useAppSelector(userTrainingListErrorSelector);
    const dispatch = useAppDispatch();

    const onClickCloseModal = () => dispatch(setUserTrainingListError(false));

    return (
        <Layout className={styles['page-container']}>
            {isLoading && <Loader />}
            <SideBar />
            <Layout className={styles['page-content']}>
                <BreadcrumbCustom />
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
