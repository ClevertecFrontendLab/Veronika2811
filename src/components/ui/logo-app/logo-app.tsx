import React, { FC } from 'react';

import { LogoSizeType } from './types/types';
import { CleverLogo, FitLogo } from './components';

type LogoProps = {
    collapsed?: boolean;
    size?: LogoSizeType;
};

export const LogoApp: FC<LogoProps> = ({ collapsed = false, size }) => (
    <React.Fragment>
        {!collapsed && <CleverLogo size={size} />}
        <FitLogo size={size} />
    </React.Fragment>
);
