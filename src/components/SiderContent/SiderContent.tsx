import { LogoWrapper } from '@components/LogoWrapper';
import { SiderFooter, SiderMenu } from './components';

export const SiderContent = ({ collapsed }: { collapsed: boolean }) => {
    return (
        <>
            <LogoWrapper collapsed={collapsed} />
            <SiderMenu />
            <SiderFooter />
        </>
    );
};
