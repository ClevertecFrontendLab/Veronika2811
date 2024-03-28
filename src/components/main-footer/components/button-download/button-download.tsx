import { FC } from 'react';
import { Button } from 'antd';

type ButtonDownloadProps = {
    icon: JSX.Element;
    label: string;
};

export const ButtonDownload: FC<ButtonDownloadProps> = ({ icon, label }) => (
    <Button type='text' icon={icon}>
        {label}
    </Button>
);
