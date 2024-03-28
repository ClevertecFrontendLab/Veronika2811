import { useState } from 'react';
import { ModalCustom } from '@components/ui/modal-custom';
import { useAppSelector } from '@hooks/redux-hooks';
import { useLogout } from '@hooks/use-logout';
import { profileSelector } from '@redux/selectors';
import { Result, Typography } from 'antd';

import { DrawerSettings } from './components/drawer-settings';
import { FeedbacksButtons } from './components/feedbacks-buttons';
import { ProfileSettingsForm } from './components/profile-settings-form';
import { TariffCards } from './components/tariff-cards';
import styles from './settings-content.module.less';

export const SettingsContent = () => {
    const logout = useLogout();

    const [drawerVisible, setDrawerVisible] = useState(false);
    const [modalCheck, setModalCheck] = useState(false);

    const { currentUserInfo } = useAppSelector(profileSelector);

    const toogleDrawerVisible = () => setDrawerVisible(!drawerVisible);

    return (
        <div className={styles['settings-content']}>
            <Typography.Title level={4} className={styles['settings-title']}>
                Мой тариф
            </Typography.Title>

            <TariffCards toogleDrawerVisible={toogleDrawerVisible} />

            <ProfileSettingsForm />

            <FeedbacksButtons />

            <DrawerSettings
                open={drawerVisible}
                onClose={toogleDrawerVisible}
                setModalCheck={setModalCheck}
            />

            <ModalCustom
                testIds='tariff-modal-success'
                open={modalCheck}
                closable={true}
                maskStyle={{
                    backdropFilter: 'blur(6px)',
                    background: 'rgba(121, 156, 212, 0.1)',
                }}
                onCancel={logout}
            >
                <Result
                    className={styles['modal-check']}
                    status='success'
                    title={'Чек для оплаты\nу вас на почте'}
                    subTitle={
                        <Typography.Text>
                            Мы отправили инструкцию для оплаты вам на e-mail{' '}
                            <strong>{currentUserInfo.email}</strong>. После подтверждения оплаты
                            войдите в приложение заново.
                        </Typography.Text>
                    }
                    extra={['Не пришло письмо? Проверьте\nпапку Спам.']}
                />
            </ModalCustom>
        </div>
    );
};
