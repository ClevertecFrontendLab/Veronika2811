import { Layout } from 'antd';

import { SiderCustom } from '@components/SiderCustom';
import { Header } from '@components/Header';

const { Footer, Content } = Layout;

export const MainPage: React.FC = () => {
    return (
        <Layout>
            <SiderCustom />
            <Layout style={{ paddingLeft: '4px' }}>
                <Header />
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    );
};
