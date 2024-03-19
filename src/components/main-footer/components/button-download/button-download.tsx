import { Button } from 'antd';

type ButtonDownloadProps = {
    icon: JSX.Element;
    label: string;
};

export const ButtonDownload = ({ icon, label }: ButtonDownloadProps) => (
    <Button type='text' icon={icon}>
        {label}
    </Button>
);
