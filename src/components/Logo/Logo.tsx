import { LogoSizeType } from './types/types';

import { CleverLogo, FitLogo } from './components';

interface LogoProps {
    collapsed?: boolean;
    size?: LogoSizeType;
}

export const Logo = ({ collapsed = false, size }: LogoProps) => (
    <>
        {!collapsed && <CleverLogo size={size} />}
        <FitLogo size={size} />
    </>
);
