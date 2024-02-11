import { PageHeader } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const routes = [
    {
        path: '/',
        breadcrumbName: 'Главная',
    },
];

export const Header = () => {
    return (
        <PageHeader
            style={{ backgroundColor: '#f0f5ff', padding: '14px 0 0 0' }}
            breadcrumb={{ routes }}
            title={
                <h1>
                    Приветствуем тебя в CleverFit — приложении, которое поможет тебе добиться своей
                    мечты!
                </h1>
            }
            extra={[<SettingOutlined />, <p>Настройки</p>]}
        />
    );
};
