import { CleverLogo } from './components/CleverLogo/CleverLogo';
import { FitLogo } from './components/FitLogo/FitLogo';

export const Logo = ({ collapsed }: { collapsed: boolean }) => {
    return (
        <>
            {!collapsed && <CleverLogo />}
            <FitLogo />
        </>
    );
};
