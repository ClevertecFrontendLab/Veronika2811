import { Input } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';

export const LOGIN_FIELDS = [
    {
        name: 'email',
        rules: [
            {
                required: true,
                message: 'Please input your e-mail!',
            },
        ],
        className: 'login-field',
        children: <Input addonBefore='e-mail:' size='large' autoComplete='username' />,
    },
    {
        name: 'password',
        rules: [{ required: true, message: 'Please input your password!' }],
        className: 'login-field',
        children: (
            <Input.Password
                placeholder='Пароль'
                size='large'
                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                autoComplete='current-password'
            />
        ),
    },
];
