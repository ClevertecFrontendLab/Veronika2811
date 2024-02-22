import { useEffect } from 'react';
import { Button, Form, Typography } from 'antd';
import { push } from 'redux-first-history';

import { useUpdatePasswordMutation } from '@redux/slice/authSlice';
import { RootState } from '@redux/store';
import { saveChangedPassword } from '@redux/slice/userInfoSlice';
import { useAppDispatch, useAppSelector } from '@hooks/typed-react-redux-hooks';
import { Paths } from '@routes/constants/Paths';

import { CHANGE_PASSWORD_FIELDS } from '@components/AuthContainer/constants';
import { AuthTestIds } from '@components/AuthContainer/constants/AuthTestIds';

import styles from './ChangePasswordForm.module.scss';

interface PasswordChangeData {
    password: string;
    confirmPassword: string;
}

export const ChangePasswordForm = () => {
    const [form] = Form.useForm();

    const [changePassword] = useUpdatePasswordMutation();

    const previousLocations = useAppSelector((state: RootState) => state.router.previousLocations);
    const newPassword = useAppSelector(
        (state: RootState) => state.userInfoSlice.newPassword,
    );
    const dispatch = useAppDispatch();

    const onFinish = async (values: PasswordChangeData) => {
        try {
            await changePassword(values).unwrap();

            dispatch(
                push(
                    `${Paths.AUTH_MAIN_RESULTS}/${Paths.AUTH_SUB_RESULT_SUCCESS_CHANGE_PASSWORD}`,
                    {
                        fromRedirect: true,
                    },
                ),
            );
        } catch (err: unknown) {
            dispatch(saveChangedPassword(values));
            dispatch(
                push(`${Paths.AUTH_MAIN_RESULTS}/${Paths.AUTH_SUB_RESULT_ERROR_CHANGE_PASSWORD}`, {
                    fromRedirect: true,
                }),
            );
        }
    };

    useEffect(() => {
        const previousPath = previousLocations?.[1]?.location?.pathname;

        if (
            previousPath ===
            `${Paths.AUTH_MAIN_RESULTS}/${Paths.AUTH_SUB_RESULT_ERROR_CHANGE_PASSWORD}`
        ) {
            onFinish(newPassword);
        }
    }, [previousLocations]);

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
