import { useCallback, useEffect } from 'react';
import { push } from 'redux-first-history';
import { CHANGE_PASSWORD_FIELDS } from '@components/auth-container/constants';
import { AuthTestIds } from '@components/auth-container/constants/auth-test-ids';
import { useAppDispatch, useAppSelector } from '@hooks/redux-hooks';
import { useUpdatePasswordMutation } from '@redux/api/auth.api';
import { authSlice, previousLocationSelector } from '@redux/selectors';
import { saveChangedPassword } from '@redux/slice/auth-slice';
import { Paths } from '@routes/constants/router-paths';
import { Button, Form, Typography } from 'antd';

import styles from './change-password-form.module.less';

type PasswordChangeData = {
    password: string;
    confirmPassword: string;
};

export const ChangePasswordForm = () => {
    const [form] = Form.useForm();

    const [changePassword] = useUpdatePasswordMutation();

    const previousLocations = useAppSelector(previousLocationSelector);
    const { newPassword } = useAppSelector(authSlice);
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
            scrollToFirstError={true}
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
                block={true}
                data-test-id={AuthTestIds.CHANGE_SUBMIT_BUTTON}
            >
                Сохранить
            </Button>
        </Form>
    );
};
