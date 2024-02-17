import { CleverLogo } from './components/CleverLogo/CleverLogo';
import { FitLogo } from './components/FitLogo/FitLogo';

export const Logo = ({ collapsed = false, auth }: { collapsed?: boolean; auth?: boolean }) => (
    <>
        {!collapsed && <CleverLogo auth={auth} />}
        <FitLogo auth={auth} />
    </>
);
