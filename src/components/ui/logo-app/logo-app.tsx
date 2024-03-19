import React from 'react';

import { LogoSizeType } from './types/types';
import { CleverLogo, FitLogo } from './components';

type LogoProps = {
    collapsed?: boolean;
    size?: LogoSizeType;
};

export const LogoApp = ({ collapsed = false, size }: LogoProps) => (
    <React.Fragment>
        {!collapsed && <CleverLogo size={size} />}
        <FitLogo size={size} />
    </React.Fragment>
);
