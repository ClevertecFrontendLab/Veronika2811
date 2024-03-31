import React, { useEffect, useState } from 'react';
import { ModalNotification } from '@components/ui/modal-notification';
import { useAppSelector } from '@hooks/redux-hooks';
import { useUpdateCurrentUserInfoMutation } from '@redux/api/profile.api';
import { profileSelector } from '@redux/selectors';
import { Button, Form, Typography } from 'antd';
import type { Moment } from 'moment';
import moment from 'moment';

import { FormUpload } from './components/form-upload';
import { PersonalInfoFormFields } from './components/personal-info-form-fields';
import { PrivacyInfoFormFields } from './components/privacy-info-form-fields';
import { PROFILE_TEST_IDS } from './constants/profile-test-ids';
import styles from './profile-form.module.less';

import { Nullebel } from '@/types/nullebel';
import { UserAvatar, UserInfoData } from '@/types/profile/profile-api-data-types';

const { Title } = Typography;

type OnValuesChangeProps =
    | Record<string, string>
    | { birthday?: Nullebel<Moment> }
    | { imgSrc?: UserAvatar };

export const ProfileForm = () => {
    const [form] = Form.useForm();

    const [isFormChanged, setIsFormChanged] = useState(false);
    const [errorSaveMessage, setErrorSaveMessage] = useState(false);

    const [updateUserInfo, { isError }] = useUpdateCurrentUserInfoMutation();

    const { currentUserInfo } = useAppSelector(profileSelector);

    useEffect(() => {
        if (currentUserInfo.email) {
            form.setFieldsValue(currentUserInfo);

            if (currentUserInfo.birthday) {
                form.setFieldValue('birthday', moment(currentUserInfo.birthday));
            }
        }
    }, [currentUserInfo, currentUserInfo.email, form]);

    const onFinish = async (values: UserInfoData) => {
        const copiedValues = { ...values };

        if (values.imgSrc) {
            if (typeof values.imgSrc === 'string') {
                copiedValues.imgSrc = values.imgSrc;
            } else if (values.imgSrc.file?.status === 'removed') {
                copiedValues.imgSrc = '';
            } else {
                copiedValues.imgSrc = `https://training-api.clevertec.ru${values.imgSrc.file?.response?.url}`;
            }
        }

        if (values.birthday && moment.isMoment(values.birthday)) {
            copiedValues.birthday = values.birthday.toISOString();
        }

        await updateUserInfo(copiedValues);

        setIsFormChanged(false);

        form.setFieldValue('password', '');
        form.setFieldValue('passwordConfirm', '');
    };

    useEffect(() => {
        if (isError) setErrorSaveMessage(true);
    }, [isError]);

    const onValuesChange = (changedValues: OnValuesChangeProps) => {
        if ('imgSrc' in changedValues && typeof changedValues.imgSrc === 'object') {
            const avator = changedValues.imgSrc as UserAvatar;

            if (avator && avator.file.status === 'error') {
                setIsFormChanged(false);
            } else {
                setIsFormChanged(true);
            }
        } else {
            setIsFormChanged(true);
        }
    };

    const closeModalErrorResult = () => setErrorSaveMessage(false);

    return (
        <React.Fragment>
            <Form
                form={form}
                name='form-profile'
                onFinish={onFinish}
                autoComplete='off'
                scrollToFirstError={true}
                className={styles['form-profile']}
                onValuesChange={onValuesChange}
            >
                <Title level={5} className={styles['personal-title']}>
                    Личная информация
                </Title>
                <div className={styles['personal-info-container']}>
                    <FormUpload />
                    <PersonalInfoFormFields />
                </div>
                <div className={styles['privacy-container']}>
                    <Title level={5} className={styles['privacy-title']}>
                        Приватность и авторизация
                    </Title>
                    <PrivacyInfoFormFields />
                </div>
                <Button
                    type='primary'
                    size='large'
                    htmlType='submit'
                    disabled={!isFormChanged}
                    data-test-id={PROFILE_TEST_IDS.profileSubmit}
                >
                    Сохранить изменения
                </Button>
            </Form>
            <ModalNotification
                type='error-save-userInfo'
                open={errorSaveMessage}
                onClickButton={closeModalErrorResult}
            />
        </React.Fragment>
    );
};
