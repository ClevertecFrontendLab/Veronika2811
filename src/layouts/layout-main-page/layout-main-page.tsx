import { Outlet } from 'react-router-dom';
import { BreadcrumbCustom } from '@components/breadcrumb-custom';
import { SideBar } from '@components/side-bar';
import { LoaderApp } from '@components/ui/loader-app';
import { ModalServerError } from '@components/ui/modal-server-error';
import { TRAINING_STATUS_ERROR } from '@constants/training/training-status-constants';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { mainSelector, trainingSelector } from '@redux/selectors';
import { setUserTrainingListError } from '@redux/slice/training-slice';
import { Layout } from 'antd';

import styles from './layout-main-page.module.less';

export const LayoutMainPage = () => {
    const { isLoading } = useAppSelector(mainSelector);
    const { userTrainingListError } = useAppSelector(trainingSelector);
    const dispatch = useAppDispatch();

    const onClickCloseModal = () => dispatch(setUserTrainingListError(false));

    return (
        <Layout className={styles['page-container']}>
            {isLoading && <LoaderApp />}
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
