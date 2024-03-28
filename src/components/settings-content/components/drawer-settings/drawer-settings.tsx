import React, { FC, useState } from 'react';
import { CheckCircleOutlined, CloseOutlined } from '@ant-design/icons';
import { DrawerCustom } from '@components/ui/drawer-custom';
import { useAppSelector } from '@hooks/redux-hooks';
import { profileSelector } from '@redux/selectors';
import { Button, Typography } from 'antd';
import classNames from 'classnames';

import { BenefitsTariff } from './components/benefits-tariff';
import { LabelPro } from './components/label-pro';
import { TariffPlanForm } from './components/tariff-plan-form';
import styles from './drawer-settings.module.less';

type DrawerSettingsProps = {
    open: boolean;
    onClose: () => void;
    setModalCheck: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DrawerSettings: FC<DrawerSettingsProps> = ({ open, onClose, setModalCheck }) => {
    const [buttonDisabled, setButtonDisabled] = useState(true);

    const { currentUserInfo } = useAppSelector(profileSelector);

    return (
        <DrawerCustom
            testIds='tariff-sider'
            onClose={onClose}
            open={open}
            closable={false}
            title={<Typography.Title level={4}>Сравнить тарифы</Typography.Title>}
            footer={
                currentUserInfo.tariff ? null : (
                    <Button
                        type='primary'
                        size='large'
                        block={true}
                        htmlType='submit'
                        form='drawer-form-tariff'
                        disabled={buttonDisabled}
                        data-test-id='tariff-submit'
                    >
                        Выбрать и оплатить
                    </Button>
                )
            }
            extra={
                <Button
                    key='submit-drawer-form'
                    size='small'
                    type='text'
                    icon={<CloseOutlined className='drawer-close-icon' onClick={onClose} />}
                />
            }
            className={styles.drawer}
        >
            <React.Fragment>
                {currentUserInfo.tariff && <LabelPro />}
                <div>
                    <div
                        className={classNames(styles.labels, {
                            [styles['labels-inactive-pro']]: !currentUserInfo.tariff,
                        })}
                    >
                        <div className={styles.label}>FREE</div>
                        <div
                            className={classNames(styles.label, {
                                [styles['label-strong']]: currentUserInfo.tariff,
                            })}
                        >
                            PRO{' '}
                            {currentUserInfo.tariff && (
                                <CheckCircleOutlined className={styles['label-icon']} />
                            )}
                        </div>
                    </div>
                    <div className={styles['info-container']}>
                        <BenefitsTariff />
                    </div>
                    {!currentUserInfo.tariff && (
                        <TariffPlanForm
                            onClose={onClose}
                            setModalCheck={setModalCheck}
                            setButtonDisabled={setButtonDisabled}
                        />
                    )}
                </div>
            </React.Fragment>
        </DrawerCustom>
    );
};
