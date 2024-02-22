import React from 'react'
import { Button, ButtonProps } from 'antd';

export const CustomButton: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return <Button {...rest}>{children}</Button>;
  };

