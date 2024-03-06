import { CleverLogo, FitLogo } from './components';
import { LogoSizeType } from './types/types';

type LogoProps = {
    collapsed?: boolean;
    size?: LogoSizeType;
};

export const Logo = ({ collapsed = false, size }: LogoProps) => (
    <>
        {!collapsed && <CleverLogo size={size} />}
        <FitLogo size={size} />
    </>
);
