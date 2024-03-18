import { useCallback, useEffect } from 'react';
import { push } from 'redux-first-history';
import { Button, Form, Typography } from 'antd';

import { CHANGE_PASSWORD_FIELDS } from '@components/AuthContainer/constants';
import { AuthTestIds } from '@components/AuthContainer/constants/AuthTestIds';

import { useUpdatePasswordMutation } from '@redux/api/auth.api';
import { newPasswordSelector, previousLocationSelector } from '@redux/selectors';
import { saveChangedPassword } from '@redux/slice/authSlice';
import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import { Paths } from '@routes/constants/Paths';

import styles from './ChangePasswordForm.module.less';

type PasswordChangeData = {
    password: string;
    confirmPassword: string;
};

export const ChangePasswordForm = () => {
    const [form] = Form.useForm();

    const [changePassword] = useUpdatePasswordMutation();

    const previousLocations = useAppSelector(previousLocationSelector);
    const newPassword = useAppSelector(newPasswordSelector);
    const dispatch = useAppDispatch();

    const onFinish = useCallback(
        async (values: PasswordChangeData) => {
            try {
                await changePassword(values).unwrap();

                dispatch(
                    push(
                        `${Paths.AUTH_MAIN_RESULTS}/${Paths.AUTH_SUB_RESULT_SUCCESS_CHANGE_PASSWORD}`,
                        { fromRedirect: true },
                    ),
                );
            } catch (err: unknown) {
                dispatch(saveChangedPassword(values));
                dispatch(
                    push(
                        `${Paths.AUTH_MAIN_RESULTS}/${Paths.AUTH_SUB_RESULT_ERROR_CHANGE_PASSWORD}`,
                        {
                            fromRedirect: true,
                        },
                    ),
                );
            }
        },
        [changePassword, dispatch],
    );

    useEffect(() => {
        const previousPath = previousLocations?.[1]?.location?.pathname;

        if (
            previousPath ===
            `${Paths.AUTH_MAIN_RESULTS}/${Paths.AUTH_SUB_RESULT_ERROR_CHANGE_PASSWORD}`
        ) {
            onFinish(newPassword);
        }
    }, [newPassword, onFinish, previousLocations]);

    return (
        <Form
            form={form}
            name='change-password'
            onFinish={onFinish}
            autoComplete='off'
            scrollToFirstError
            className={styles['change-password']}
            initialValues={{ remember: true }}
        >
            <Typography.Paragraph>Восстановление аккаунта</Typography.Paragraph>
            {CHANGE_PASSWORD_FIELDS.map((item) => (
                <Form.Item
                    key={`change-password-${item.name}`}
                    name={item.name}
                    rules={item.rules}
                    dependencies={[item.dependencies] || []}
                    help={item.help || ''}
                >
                    {item.children}
                </Form.Item>
            ))}

            <Button
                htmlType='submit'
                type='primary'
                size='large'
                block
                data-test-id={AuthTestIds.CHANGE_SUBMIT_BUTTON}
            >
                Сохранить
            </Button>
        </Form>
    );
};
