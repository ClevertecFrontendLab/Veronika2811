import { CleverLogo } from './components/CleverLogo/CleverLogo';
import { FitLogo } from './components/FitLogo/FitLogo';
import { LogoSizeType } from './types/types';

export const Logo = ({ collapsed = false, size }: { collapsed?: boolean; size?: LogoSizeType }) => (
    <>
        {!collapsed && <CleverLogo size={size} />}
        <FitLogo size={size} />
    </>
);
